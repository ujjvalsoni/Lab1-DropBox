const express = require('express');
const app = express();
const path = require('path');
const ejs = require('ejs');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const upload = require('express-fileupload');
const http = require('http');
const fs = require('fs');
const mkdirp = require('mkdirp');
const download = require('download');
const del = require('delete');
const cookieParser = require("cookie-parser");
const session = require('express-session');
const CryptoJS = require("crypto-js");

const saltRounds = 10;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(upload());
app.use(cookieParser());
app.use(session({secret: 'ddsad', resave: true, saveUninitialized: true}));

let UserName = "";
let count = 0;

const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password: '',
    database: 'nodemysql'
});

const pool = mysql.createPool({
    connectionLimit: 500,
    host : 'localhost',
    user : 'root',
    password: '',
    database: 'nodemysql',
    debug : false
});


app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.get('/lname', (req, res) => {
    var lname = UserName;
    console.log(lname);
    res.json({lname: lname});
});

app.get('/fname', (req, res) => {

    console.log(count);
    res.json({count: count});
});
db.connect((err) => {
if(err) throw err;
    console.log("mysql connected");
});



// connection pooling implemented only for login function.
app.post('/login1', function(req,res) {

    UserName = req.body.username;
    const PassWord = req.body.password;

    let sql = `SELECT * FROM people WHERE UserName =` + mysql.escape(UserName);
    pool.getConnection(function(err, connection){
        if(err) {throw err;}

        else
        {
            console.log(connection.threadId);
            connection.query(sql, function(err, rows){
                connection.release();
                var x = (rows[0].PassWord);
                var bytes  = CryptoJS.AES.decrypt(x.toString(), 'secret key 123');
                var plaintext = bytes.toString(CryptoJS.enc.Utf8);

                if(PassWord === plaintext)
                {
                    req.session.name = UserName;
                    count = 1;
                    var dir = './uploads/' + UserName;
                    mkdirp(dir, function(err) {});
                    res.redirect("http://localhost:3000/#/home");

                }
                else {
                    res.redirect("http://localhost:3000/#/");
                }
            });
        }
    });
});

//getting user data for the about page.

app.get('/userdata', (req, res) => {

            UserName = UserName;

            let sql = `SELECT * FROM people WHERE UserName =` + mysql.escape(UserName);
            let query = db.query(sql, (err, rows, result) => {
                let data = [
                    Work= UserName+ "'s works at/as " + rows[0].Work + ".",
                    Education = UserName+ "'s has been educated at/as " + rows[0].Education + ".",
                    Phone = UserName+ "'s contact number is " + rows[0].Phone + ".",
                    Music = UserName+ "'s likes music of " + rows[0].Music + "kind.",
                    Shows = UserName+ "'s likes shows of " + rows[0].Shows + "kind.",
                    Sports = UserName+ "'s likes sports of " + rows[0].Sports + "kind."
                ];
                res.json(data);
            });
});

//adding user information to the database.

    app.post('/users/add', (req,res) =>{

            var UserName = req.body.username;
            var PassWord = req.body.password;
            var FirstName = req.body.firstname;
            var LastName = req.body.lastname;
            var Age = req.body.age;
            var DOB = req.body.DOB;
            var Gender = req.body.gender;
            var Work = req.body.work;
            var Education = req.body.education;
            var Phone = req.body.phone;
            var Music = req.body.music;
            var Shows = req.body.shows;
            var Sports = req.body.sports;
            var Email = req.body.email;
            var hash = "";

            //password encryption

        var ciphertext = CryptoJS.AES.encrypt(PassWord, 'secret key 123');
            let post = {
                UserName: UserName,
                PassWord: ciphertext,
                FirstName: FirstName,
                LastName: LastName,
                Age: Age,
                Gender: Gender,
                birth: DOB,
                Work: Work,
                Education: Education,
                Phone: Phone,
                Music: Music,
                Shows: Shows,
                Sports: Sports,
                Email: Email
            };
            let sql = 'INSERT INTO people SET ?';
            let query = db.query(sql, post, (err, result) => {
                if (err) throw err;
            });
            res.redirect("http://localhost:3000/#/");

    });


//display the list of files from the logged in users folder

app.get('/listdir', function(req, res) {
    if(count === 1)
    {
        req.session.name = UserName;
    }


    if(!req.session.name)
    {
        console.log(req.session.name);
        res.redirect("http://localhost:3000/#/");
    }
    else
        {
        const testFolder = './uploads/' + UserName + '/';
        const fs = require('fs');
        let arr = [];
        let dir = [];
        let y = "";

        fs.readdirSync(testFolder).forEach(file => {
            y = file.toString();
            //console.log(y);
            if (fs.lstatSync(testFolder + file).isDirectory()) {
                //dir.push(file);
            }
            else {
                arr.push(file);
            }
        })

        res.json(arr);
    }


});

//display the list of directories from the logged in users folde

app.get('/listfiles', function(req, res) {

        const testFolder = './uploads/' + UserName + '/';
        const fs = require('fs');
        let arr = [];
        let dir = [];
        let y = "";

        fs.readdirSync(testFolder).forEach(file => {
            y = file.toString();
            //console.log(y);
            if (fs.lstatSync(testFolder + file).isDirectory()) {
                dir.push(file);
            }
        })
        res.json(dir);

});

app.post('/upload',function(req,res){
    if(!req.session.name)
    {
        console.log(req.session.name);
        res.redirect("http://localhost:3000/#/");
    }
    else{

        var action = "upload";
        if (req.files.upfile) {
            var file = req.files.upfile,
                name = file.name,
                type = file.mimetype;
            var uploadpath = __dirname + '/uploads/' + UserName + '/' + name;
            file.mv(uploadpath, function (err) {
                if (err) {
                    console.log("File Upload Failed", name, err);
                    res.send("Error Occured!")
                }
                else {

                    let post = {UserName: UserName, name: file.name, star: 0, action: action};
                    let sql = 'INSERT INTO files SET ?';
                    let query = db.query(sql, post, (err, result) => {
                        if (err) throw err;
                    });

                    console.log("File Uploaded", name);
                    res.redirect("http://localhost:3000/#/listdir");
                }
            });
        }
        else {
            res.send("No File selected !");
            res.end();
        };

    }
})

app.post('/createdir', (req, res) => {
    if(!req.session.name)
    {
        console.log(req.session.name);
        res.redirect("http://localhost:3000/#/");
    }
    else {

        var dirname = req.body.dirname;
        var dir = './uploads/' + UserName + '/' + dirname;
        mkdirp(dir, function (err) {
        });

        res.redirect("http://localhost:3000/#/listdir");
    }

});

app.get('/download/*', (req, res) => {

    if(!req.session.name)
    {
        console.log(req.session.name);
        res.redirect("http://localhost:3000/#/");
    }
    else {

        var action = "download";
        var dirname = req.params[0];
        var file = './uploads/' + UserName + '/' + dirname;
        let post = {UserName: UserName, name: dirname, star: 0, action: action};
        let sql = 'INSERT INTO files SET ?';
        let query = db.query(sql, post, (err, result) => {
            if (err) throw err;
        });
        res.download(file);
    }

});

app.get('/delete/*', (req, res) => {

    if(!req.session.name)
    {
        console.log(req.session.name);
        res.redirect("http://localhost:3000/#/");
    }
    else {

        var action = "delete";
        var dirname = req.params[0];
        var file = './uploads/' + UserName + '/' + dirname
        /*
        fs.unlink(file, (err) => {
            if (err) throw err;
        });*/
        let post = {UserName: UserName, name: dirname, star: 0, action: action};
        let sql = 'INSERT INTO files SET ?';
        let query = db.query(sql, post, (err, result) => {
            if (err) throw err;
        });
        del(file);

        res.redirect("http://localhost:3000/#/delete");
    }
});

app.get('/log', (req, res) => {

        var x = [];
        var y = "";
        let sql = `SELECT * FROM files WHERE UserName =` + mysql.escape(UserName);
        let query = db.query(sql, (err, rows, result) => {
            for (var i = 0; i < rows.length; i++) {
                y = (rows[i].UserName + " " + rows[i].action + "s" + " " + rows[i].name);
                x.push(y);
            }
            res.json(x);
        });

});

app.get('/star/*', (req, res) => {

    if(!req.session.name)
    {
        console.log(req.session.name);
        res.redirect("http://localhost:3000/#/");
    }
    else {

        var filename = req.params[0];

        let sql1 = `UPDATE files SET star = 1 WHERE name =` + mysql.escape(filename);
        let query1 = db.query(sql1, (err, rows, result) => {
            res.redirect("http://localhost:3000/#/listdir");
        });

    }
});


app.get('/getstar', (req, res) => {

        var x= [];
        var y= '';
        var p =[];
        var z = 0;
        let sql = `SELECT * FROM files WHERE star = 1`;
        let query = db.query(sql, (err, rows, result) => {
            for (var i = 0; i < rows.length; i++) {
                y = (rows[i].name);
                //console.log(y + "         " + req.session.name);

                if(rows[i].UserName === req.session.name)
                {
                    x.push(y);
                }
            }

            //array to find unique values from the array x and setting them to array p

            for(var i=0; i<x.length; i++){
                for(var j=0; j<i+1; j++){
                    if(p[j] === x[i]){
                        z=1;
                        break;
                    }
                    }
                    if(z === 0){
                        p.push(x[i]);
                    }
                    else
                    {
                        z=0;
                    }
            }
            res.json(p);
        });
});





app.get('/logout', (req, res) => {

    if(!req.session.name)
    {
        console.log(req.session.name);
        res.redirect("http://localhost:3000/#/");
    }
    else {
            req.session.name = "";
            count = 0;
            req.session.destroy();
            res.redirect("http://localhost:3000/#/");
    }
});



app.listen(4000);
console.log('Listening on localhost:4000');
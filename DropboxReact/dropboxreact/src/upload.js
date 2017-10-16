import React from 'react';
import {getfname} from './api/api';
import {Navbar1} from "./navbar";
import './App.css';

export class Upload extends React.Component{

    constructor() {
        super();
        this.state = {
            count: ''
        };
    }

    app() {
        getfname().then((count) => {
            this.setState({count:count.count});
        });
    };

    componentDidMount() {
        this.app();
    }

    render(){
        let button = null;
        if (this.state.count === 1) {
            button =<div>
                <Navbar1/>
                     <form classname="fileupload" action="http://localhost:4000/upload" method="post" enctype="multipart/form-data">
                    <h1>Upload File Here</h1>
                         <label for="file-upload" class="custom-file-upload">
                             <i class="fa fa-cloud-upload"/> Click here to Choose
                         </label>
                         <input id="file-upload" type="file" name="upfile"/>
                         <br/>
                         <input type="submit" value="Submit"/>
                </form>
            </div>;
        }
        else{
            button = <div>
                <br/>
                <h1>You are not signed in!!</h1>
                <a href={"http://localhost:3000/#/"}>Sign In!!</a>
            </div>;
        }

        return (
            <div>
                {button}
            </div>
        );
    }
}
import React from 'react';
import {getlname, getfname} from './api/api';
import {Navbar1} from "./navbar";

export class Home extends React.Component {

    constructor() {
        super();
        this.state = {
            lname: '',
            count: ''
        };
    }

    app() {
        getlname().then((lname) => {
          this.setState({lname:lname.lname });
            console.log(lname.lname);
        });

        getfname().then((count) => {
            this.setState({count:count.count});
        });
    };

    componentDidMount() {
        this.app();
    }

    render() {
        let button = null;
        if (this.state.count === 1) {
            button = <div>
                <Navbar1/>
                <h2>Welcome!!</h2>

                <button onClick={this.handleClick} class="btn btn-danger" ><a href={`http://localhost:4000/logout`}>Logout!</a></button>
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


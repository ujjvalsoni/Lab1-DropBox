import React from 'react';
import {getfname} from './api/api';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import './App.css';


export class Navbar1 extends React.Component{

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

                <div class="topnav">
                    <a href="http://localhost:3000/#/home">Home</a>
                    <a href="http://localhost:3000/#/upload">Upload</a>
                    <a href="http://localhost:3000/#/listdir">List all Files</a>
                    <a href="http://localhost:3000/#/starlist">Stared Files</a>
                    <a href="http://localhost:3000/#/createdir">Create Folder</a>
                    <a href="http://localhost:3000/#/delete">Delete</a>
                    <a href="http://localhost:3000/#/log">Log</a>
                    <a href="http://localhost:3000/#/about">About</a>
                    <a href="http://localhost:4000/logout">Sign Out!</a>
                </div>

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
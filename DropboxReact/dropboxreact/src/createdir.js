import React from 'react';
import {getfname} from './api/api';
import {Navbar1} from "./navbar";


export class Createdir extends React.Component{

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

    render() {
        let button = null;
        if (this.state.count === 1) {
            button = <div>
                <Navbar1/>
                <form method="POST" action="http://localhost:4000/createdir">
                    <p>Folder Name:</p>
                    <input type="text" name="dirname"/>
                    <br/><br/>
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

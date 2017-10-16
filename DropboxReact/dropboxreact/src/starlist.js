import React from 'react';
import {getstar, getfname} from './api/api';
import {Navbar1} from "./navbar";

export class Starlist extends React.Component {
    constructor() {
        super();
        this.state = {
            list: [],
            count: ''
        };
    }

    log() {
        getstar().then((list) => {
            this.setState({list});
            console.log(list);
        });

        getfname().then((count) => {
            this.setState({count:count.count});
        });
    }

    componentDidMount() {
        this.log();
    }

    render() {
        let button = null;
        if (this.state.count === 1) {
            button =<div>
                <Navbar1/>
                <h2>List of all the files that were stared!!</h2>
                <div classname="well">
                    <ul classname="list-group">
                        {this.state.list.map((item,index) =>
                            <li key={index} className={"list-group-item list-group-item-info"}>{item}</li>
                        )}
                    </ul>
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

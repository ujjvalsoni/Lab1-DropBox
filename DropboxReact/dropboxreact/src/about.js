import React from 'react';
import {getuserdata, getfname} from './api/api';
import {Navbar1} from "./navbar";

export class About extends React.Component {
    constructor() {
        super();
        this.state = {
            list: [],
            count: ''
        };
    }

    listdir() {
        getuserdata().then((list) => {
            this.setState({list});
            console.log(list);
        });
        getfname().then((count) => {
            this.setState({count:count.count});
        });
    }

    componentDidMount() {
        this.listdir();

    }

    render() {
        let button = null;
        if (this.state.count === 1) {
            button = <div>
                <Navbar1/>
                <div classname="well">
                    <ul classname="list-group">
                    <h2>User Information!!</h2>
                    {this.state.list.map((item,index) =>
                        <li key={index} className={"list-group-item list-group-item-info"}>
                            {item}
                        </li>
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

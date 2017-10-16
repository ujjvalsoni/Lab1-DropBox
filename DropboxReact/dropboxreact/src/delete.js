import React from 'react';
import {getlistdir, getfname} from './api/api';
import ReactDOMServer from 'react-dom/server';
import {Navbar1} from "./navbar";

export class Delete extends React.Component {
    constructor() {
        super();
        this.state = {
            list: [],
            count: ''
        };
    }

    listdir() {
        getlistdir().then((list) => {
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

                <h2>Click on the link to delete that file!!</h2>
                <div classname="well">
                <ul classname="list-group">
                <br/>
                    {this.state.list.map((item,index) =>
                        <li key={index} className={"list-group-item list-group-item-info"}>
                            <a href={`http://localhost:4000/delete/${ReactDOMServer.renderToString(item)}`}> {item}</a>
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

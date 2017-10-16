import React from 'react';
import {getlistdir, getfname, getlistfiles} from './api/api';
import ReactDOMServer from 'react-dom/server';
import {Star} from "./star";
import {Navbar1} from "./navbar";

export class Listdir extends React.Component {
    constructor() {
        super();
        this.state = {
            list: [],
            list1 : [],
            count: ''
        };
    }

    listdir() {
        getlistdir().then((list) => {
            this.setState({list});
        });

        getlistfiles().then((list1) => {
            this.setState({list1});
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

            button =<div >
                <Navbar1/>
                <h2>List of Files</h2>
                <h4>Click on any file to download it!!</h4>
                <div classname="well">
                <ul classname="list-group">
                    {this.state.list.map((item,index) =>
                        <li key={index} className={"list-group-item list-group-item-info"}>
                            <a href={`http://localhost:4000/download/${ReactDOMServer.renderToString(item)}`}> {item}</a>
                            <a href={`http://localhost:4000/star/${ReactDOMServer.renderToString(item)}`}><Star/></a>
                        </li>
                    )}

                </ul>
                </div>
                <h2>List of Directories</h2>
                <div classname="well">
                <ul classname="list-group">

                    {this.state.list1.map((item,index) =>
                        <li key={index} className={"list-group-item list-group-item-info"}>
                             {item}
                            <a href={`http://localhost:4000/star/${ReactDOMServer.renderToString(item)}`}><Star/></a>
                        </li>

                    )}
                </ul>
                </div>

            </div>;
        }

        else{
            //this.setState({list:[]});
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

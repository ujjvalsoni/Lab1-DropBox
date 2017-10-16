import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Home} from './home';
import registerServiceWorker from './registerServiceWorker';
import {Router, Route, hashHistory} from "react-router";
import {Signin} from "./signin";
import {Signup} from "./signup";
import {Upload} from "./upload";
import {Listdir} from "./listdir";
import {Createdir} from "./createdir";
import {Delete} from "./delete";
import {Log} from "./log";
import {Star} from "./star";
import {Navbar1} from "./navbar";
import {Starlist} from "./starlist";
import {About} from "./about";

ReactDOM.render(

    <Router history={hashHistory}>
        <Route path="/home" component={Home}>
        </Route>
        <Route path="/" component={Signin}>
        </Route>
        <Route path="/signup" component={Signup}>
        </Route>
        <Route path="/upload" component={Upload}>
        </Route>
        <Route path="/listdir" component={Listdir}>
        </Route>
        <Route path="/log" component={Log}>
        </Route>
        <Route path="/star" component={Star}>
        </Route>
        <Route path="/about" component={About}>
        </Route>
        <Route path="/createdir" component={Createdir}>
        </Route>
        <Route path="/about" component={About}>
        </Route>
            <Route path="/navbar" component={Navbar1}>
            </Route>
            <Route path="/delete" component={Delete}>
            </Route>
        <Route path="/starlist" component={Starlist}>
        </Route>
    </Router>,
    document.getElementById('root'));
registerServiceWorker();

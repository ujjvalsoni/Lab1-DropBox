import React from 'react';
import { Link } from 'react-router';
export class Signin extends React.Component{

    render() {
        return (
            <div classname="Container">
                <form method = "POST" action = "http://localhost:4000/login1">
                    User Name:<br/>
                    <input type="text" name="username" required/>
                    <br/><br/>
                    PassWord:<br/>
                    <input type="PassWord" name="password" required/>
                    <br/><br/>
                    <input type="submit" value="Submit"/>
                    or: <Link to="signup">Sign Up</Link>
                </form>
            </div>
        );
    }
}

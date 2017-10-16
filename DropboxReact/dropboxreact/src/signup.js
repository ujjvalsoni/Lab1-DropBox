import React from 'react';
import {getfname} from './api/api';

export class Signup extends React.Component{
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
        return (
            <div>
                <form method = "POST" action = "http://localhost:4000/users/add">
                    User Name:<br/>
                    <input type="text" name="username" required/>
                    <br/><br/>
                    PassWord:<br/>
                    <input type="PassWord" name="password" required/>
                    <br/><br/>
                    First name:<br/>
                    <input type="text" name="firstname" required/>
                    <br/><br/>
                    Last name:<br/>
                    <input type="text" name="lastname" required/>
                    <br/><br/>
                    Age:<br/>
                    <input type="number" name="age" required/>
                    <br/><br/>
                    Date of Birth:<br/>
                    <input type="Date" name="DOB" required/>
                    <br/><br/>
                    Gender
                    <br/>
                    <input class="w3-radio" type="radio" name="gender" value="M" />Male
                    <br/>
                    <input class="w3-radio" type="radio" name="gender" value="F" />Female
                    <br/><br/>

                    Current Work:<br/>
                    <input type="text" name="work" />
                    <br/><br/>
                    Education:<br/>
                    <input type="text" name="education"/>
                    <br/><br/>
                    Phone-Number:<br/>
                    <input type="number" name="phone" required/>
                    <br/><br/>
                    Music:<br/>
                    <textarea rows="4" cols="50" name="music" required/>
                    <br/><br/>
                    Shows:<br/>
                    <textarea rows="4" cols="50" name="shows" required/>
                    <br/><br/>
                    Sports:<br/>
                    <textarea rows="4" cols="50" name="sports" required/>
                    <br/><br/>
                    Email:<br/>
                    <input type="email" name="email" required/>
                    <br/><br/>
                    <input type="submit" value="Submit"/>
                </form>
            </div>

        );
    }
}

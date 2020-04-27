import React, { useState } from "react";
import {Button, FormGroup, FormControl, Image} from "react-bootstrap";
import "./Login.css";
import logo from '../BackgroundImage/AmbrosiaAlertLogo.png'



export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
    }

    return (
        <div className={"PageFrame"}>
        <div className="Login">




            <form className={'Form'} onSubmit={handleSubmit}>
                <img className={"LogoImage"} src = {logo} alt={'Logo'}/>
                <h1 className={'LoginText'}>Member Login</h1>
                <FormGroup controlId="email" bsSize="large">

                    <FormControl
                        className ='EmailBox'

                        type="email"
                        value={email}
                        placeholder = 'Email'
                        onChange={e => setEmail(e.target.value)}

                    />
                </FormGroup>
                <FormGroup controlId="password" bsSize="large">

                    <FormControl
                        className={'PasswordBox'}
                        value={password}
                        placeholder = 'Password'
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                </FormGroup>
                <Button className ={'LoginBtn'} block bsSize="large" disabled={!validateForm()} type="submit">
                    Login
                </Button>
            </form>
        </div>
        </div>
    );
}

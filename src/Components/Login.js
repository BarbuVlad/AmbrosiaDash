import React, { useState ,useEffect} from "react";
import {Button, FormGroup, FormControl} from "react-bootstrap";
import "./Login.css";
import logo from '../BackgroundImage/AmbrosiaAlertLogo.png'
import NavBar from './NavBar'

import axios from 'axios'



export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [serverAnswer,setServerAnswer] = useState("");

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
    }


    let checkAcc = () => {
        const proxyurl = "https://cors-anywhere.herokuapp.com/" //folosesc un proxi ca sa evit eroarea
        axios.post(proxyurl+'http://92.87.91.16/backend_code/api/admins/login.php',


            {
                name: email,
                password: password



            }
        ).then(res =>{
            setServerAnswer(res.data.message)
        console.log(serverAnswer)})


    }




    if(serverAnswer ==="login successfull")
    {
        localStorage.setItem('logged', serverAnswer )
        return(
            <NavBar/>
        );
    }
    else{
        return (
            <div className={"PageFrame"}>
                <div className="Login">




                    <form className={'Form'} onSubmit={handleSubmit}>
                        <img className={"LogoImage"} src = {logo} alt={'Logo'}/>
                        <h1 className={'LoginText'}>Member Login</h1>
                        <FormGroup controlId="email" bsSize="large">

                            <FormControl
                                className ='EmailBox'
                                type='email'
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
                        <Button className ={'LoginBtn'}
                                block bsSize="large"
                                disabled={!validateForm()}
                                type="submit"
                                onClick ={checkAcc}
                        >

                            Login
                        </Button>
                    </form>
                </div>

            </div>




        );

    }


}

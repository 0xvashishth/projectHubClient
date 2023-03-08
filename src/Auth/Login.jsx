import React, { useState } from "react";
import { Signin } from "./API";
import {setStorageLogin,removeStorageLogin, checkUser} from "../checkStorage"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {checkLogin} from "./AuthChecking";

const LoginScreen = (props) => {

    checkLogin();
    const navigate = useNavigate();
    const [stateemail, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [loader, setloader] = useState([]);

    
    // isLoggedin();

    const handleEmailChange = (event) => {
        const value = event.target.value;
        setemail(value);
      };
    const handlePasswordChange = (event) => {
        const value = event.target.value;
        setpassword(value);
      };
    
    const loginSubmit = event => {
        event.preventDefault();
        setloader("Logging..");
        Signin(stateemail, password).then((res) => {
            if (res.status !== 200) {
            setloader(res.data.errors.password[0]);
            } else {
            console.log(res.data)
            const {userDTO, token} = res.data;
            const {id, email, name, twitter, linkedin, github, points, projects} = userDTO
            setStorageLogin(id, email, name, twitter, linkedin, github, points, projects, token)
            setloader("LoggedIn Successfully!");
            setemail(email);
            navigate("/", {state: {refreshForUpdate: 1}});
            }
        })
        .catch((err) => console.log(err));

    }

    return(
        <div className='m-3 p-1 border border-primary rounded'>
            <div className='m-4'>
                <h2>Login Here</h2>
                <hr/>
                <div className='m-4'>
                    <div className="form-group">
                        <label htmlFor="email" className="form-label mt-4">Email address</label>
                        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" value={stateemail} onChange={handleEmailChange}/>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="form-label mt-4">Password</label>
                        <input type="password" className="form-control" id="password" aria-describedby="emailHelp" placeholder="Enter password" value={password} onChange={handlePasswordChange} />
                    </div>
                </div>
                {loader}
                <div className='m-4'>
                    <button className='btn btn-outline-primary' onClick={loginSubmit}>Login</button>
                </div>
            </div>
            <div>
                Don't Have An Account? <a href="/signup">Signup Here</a>
            </div>
        </div>
    )
}

export default LoginScreen;
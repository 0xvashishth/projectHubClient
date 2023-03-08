import React, { useState } from "react";
import {setStorageLogin,removeStorageLogin, checkUser} from "../checkStorage"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {checkLogin, checkSignup} from "./AuthChecking";
import { Signup } from "./API";

export default function SignupScreen(props){
  checkSignup();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
    github: "",
    twitter: "",
    name: "",
    linkedin: "",
    loading: "",
  });

  const { email, password, github, twitter, name, linkedin, loading } = values;

  //   if(localStorage.getItem("Verified")){
  //     usrloggedIn = localStorage.getItem("Verified");
  //   }

  const handleChange = (name) => (event) => {
    const value = event.target.value;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: "Loading..." });
    if(!email || !password || !github || !twitter || !linkedin){
        setValues({ ...values, loading: "All Fields Are Required..!"});
    }else{
    Signup(email, password, github, name, twitter, linkedin)
      .then((res) => {
        if (res.status !== 200) {
          console.log(res)
          setValues({ ...values, loading: res.data });
        } else {
            console.log(res.data)
            const {userDTO, token} = res.data;
            const {id, email, name, twitter, linkedin, github, points, projects} = userDTO
            setStorageLogin(id, email, name, twitter, linkedin, github, points, projects, token)
            setValues({ ...values, loading: "Registered Successfully...!" });
            navigate("/");
        }
      })
      .catch((err) => console.log(err));
    }
  };

  return (
    <div className="m-3 p-1 border border-primary rounded">
      <div className="m-4">
        <h2>Signup Here</h2>
        <hr />
        <form encType="multipart/form-data">
          <div className="m-4">
            <div className="form-group">
              <label htmlFor="email" className="form-label mt-4">
                Email address
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleChange("email")}
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label mt-4">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={handleChange("password")}
                className="form-control"
                id="password"
                aria-describedby="emailHelp"
                placeholder="Enter password"
              />
            </div>
            <div className="form-group">
              <label htmlFor="name" className="form-label mt-4">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={handleChange("name")}
                className="form-control"
                id="name"
                aria-describedby="emailHelp"
                placeholder="Enter Name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="twitter" className="form-label mt-4">
              Twitter
              </label>
              <input
                type="text"
                name="twitter"
                value={twitter}
                onChange={handleChange("twitter")}
                className="form-control"
                id="twitter"
                aria-describedby="emailHelp"
                placeholder="Enter twitter handle"
              />
            </div>
            <div className="form-group">
              <label htmlFor="linkedin" className="form-label mt-4">
              Linkedin
              </label>
              <input
                type="text"
                name="linkedin"
                value={linkedin}
                onChange={handleChange("linkedin")}
                className="form-control"
                id="linkedin"
                aria-describedby="emailHelp"
                placeholder="Enter linkedin handle"
              />
            </div>
            <div className="form-group">
              <label htmlFor="github" className="form-label mt-4">
              GitHub
              </label>
              <input
                type="text"
                name="github"
                value={github}
                onChange={handleChange("github")}
                className="form-control"
                id="github"
                aria-describedby="emailHelp"
                placeholder="Enter github handle"
              />
            </div>
          </div>
          <div className="m-4">
            <button
              type="submit"
              onClick={handleSubmit}
              className="btn btn-outline-primary"
            >
              Signup
            </button>
          </div>
          {loading}
        </form>
      </div>
    </div>
  );
};
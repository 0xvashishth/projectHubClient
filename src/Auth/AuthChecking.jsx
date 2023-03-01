import {setStorageLogin,removeStorageLogin, checkUser} from "../checkStorage"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function checkLogin(){
    const navigate = useNavigate();
    // removeStorageLogin();
    function isLoggedin(){
        if(checkUser()){
          navigate("/");
        }else{
          navigate("/login")
        }
    }
    useEffect(() => {
      isLoggedin();
    }, []);
}

export function checkSignup(){
  const navigate = useNavigate();
  // removeStorageLogin();
  function isLoggedin(){
      if(checkUser()){
        navigate("/");
      }else{
        navigate("/signup")
      }
  }
  useEffect(() => {
    isLoggedin();
  }, []);
}

export function checkCreate(){
  const navigate = useNavigate();
  // removeStorageLogin();
  function isLoggedin(){
      if(checkUser()){
        console.log("LoggedIn..!")
      }else{
        navigate("/login")
      }
  }
  useEffect(() => {
    isLoggedin();
  }, []);
}
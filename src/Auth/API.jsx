import axios from "../axios";
export const Signup = async (email, password, github, name, twitter, linkedin) => {
  var id=0;
  var points=0;
  var projects = []
  var apiLink = "/api/Users/Register?password="+password
  var response
  await axios
    .post(apiLink, {
      id,email,name,twitter,linkedin,github,points,projects
    })
    .then((res) => {
      response = res;
    })
    .catch((err) => {
      response = err.response;
    });
  return response;
};

export const PinSubmit = async (email, pin) => {
  var response;
  await axios
    .post("http://localhost:8082/api/v1/verify", {
      pin,
      email,
    })
    .then((res) => {
      response = res;
    })
    .catch((err) => {
      response = err.response;
    });
  return response;
};

export const Signin = async (email, password) => {
    var response;
    await axios
      .post("/api/Users/login", {
        email,
        password,
      })
      .then((res) => {
        response = res;
      })
      .catch((err) => {
        response = err.response;
      });
    return response;
  };

export const ForgotPassWord = async (email) => {
    var response;
    await axios
      .post("http://localhost:8082/api/v1/forgot_password", {
        email,
      })
      .then((res) => {
        response = res;
      })
      .catch((err) => {
        response = err.response;
      });
    return response;
  };

  export const AccessResetPage = async (token,pin) => {
    var response;
    await axios
      .post("http://localhost:8082/api/v1/reset_password_access", {
        token,pin
      })
      .then((res) => {
        response = res;
      })
      .catch((err) => {
        response = err.response;
      });
    return response;
  };

  export const ResetPassword = async (token,pin,newPassword) => {
    var response;
    await axios
      .post("http://localhost:8082/api/v1/reset_password", {
        token,pin,newPassword
      })
      .then((res) => {
        response = res;
      })
      .catch((err) => {
        response = err.response;
      });
    return response;
  };
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

export const ProjectSubmit = async (name, description, ytlink, imagesurls, visibility) => {
  var response
  var id = 0;
  var creator = localStorage.getItem("id");
  var apiLink = "/api/Projects?creatorId="+creator
  var token = localStorage.getItem("token")
  var tokenbearer = "bearer " + token
  let axiosConfig = {
    headers: {
        'Content-Type': 'application/json',
        "accept": "text/plain",
        "Authorization": tokenbearer,
        "Access-Control-Allow-Origin": "*",
    }
  };
  await axios
    .post(apiLink, {
      id,name, description, ytlink, imagesurls, creator, visibility
    }, axiosConfig)
    .then((res) => {
      response = res;
    })
    .catch((err) => {
      response = err.response;
    });
  return response;
};

export const ProjectEdit = async (id, name, description, ytlink, imagesurls, visibility) => {
  var response
  var creator = localStorage.getItem("id");
  var apiLink = "/api/Projects/"+id
  var token = localStorage.getItem("token")
  var tokenbearer = "bearer " + token
  let axiosConfig = {
    headers: {
        'Content-Type': 'application/json',
        "accept": "text/plain",
        "Authorization": tokenbearer,
        "Access-Control-Allow-Origin": "*",
    }
  };
  await axios
    .put(apiLink, {
      id,name, description, imagesurls, ytlink, creator, visibility
    }, axiosConfig)
    .then((res) => {
      response = res;
    })
    .catch((err) => {
      response = err.response;
    });
  return response;
};

export const ProjectDelete = async (id, owner) => {
  var response
  var loggedin = localStorage.getItem("id");
  if(owner != loggedin){
    return "you are not wowner";
  }
  var apiLink = "/api/Projects/"+id
  var token = localStorage.getItem("token")
  var tokenbearer = "bearer " + token
  console.log(tokenbearer)
  let axiosConfig = {
    headers: {
        'Content-Type': 'application/json',
        "accept": "text/plain",
        "Authorization": tokenbearer,
        "Access-Control-Allow-Origin": "*",
    }
  };
  await axios
    .delete(apiLink, axiosConfig)
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

  export const UserEdit = async (id, name, twitter, linkedin, github) => {
    var response
    var creator = localStorage.getItem("id");
    var apiLink = "/api/Users/"+id
    var token = localStorage.getItem("token")
    var tokenbearer = "bearer " + token
    let axiosConfig = {
      headers: {
          'Content-Type': 'application/json',
          "accept": "text/plain",
          "Authorization": tokenbearer,
          "Access-Control-Allow-Origin": "*",
      }
    };
    await axios
      .put(apiLink, {
        id, name, twitter, linkedin, github
      }, axiosConfig)
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
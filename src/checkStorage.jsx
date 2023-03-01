export function setStorageLogin(id, email, name, twitter, linkedin, github, points, projects, token){
    localStorage.setItem("email", email);
    localStorage.setItem("id", id);
    localStorage.setItem("twitter",twitter)
    localStorage.setItem("name", name)
    localStorage.setItem("linkedin", linkedin)
    localStorage.setItem("github", github)
    localStorage.setItem("points", points)
    localStorage.setItem("token", token)
    localStorage.setItem("projects", projects)
}

export function removeStorageLogin(id, email, name, twitter, linkedin, github, points, projects, token){
    localStorage.removeItem("email");
    localStorage.removeItem("id");
    localStorage.removeItem("twitter")
    localStorage.removeItem("name")
    localStorage.removeItem("linkedin")
    localStorage.removeItem("github")
    localStorage.removeItem("points")
    localStorage.removeItem("token")
    localStorage.removeItem("projects")
}

export function checkUser(){
    if(localStorage.getItem("email") && localStorage.getItem("id") && localStorage.getItem("token")){
        return true;
    }
    else{
        return false;
    }
}
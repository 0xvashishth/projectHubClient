import {setStorageLogin,removeStorageLogin, checkUser} from "../checkStorage"

export default function Nav(props) {
  var checkhello;
  if(checkUser()){
    checkhello = true;
  }else{
    checkhello = false;
  }
  function LogoutClick(){
    removeStorageLogin();
    window.location.reload(true);
  }
  function createProjectClick(){
    window.location.replace("/project/create")
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">ProjectHub</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarColor02">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a className="nav-link" href="/projects">Project List</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/projects">Top Projects</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/users">Top Users</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">More</a>
              <div className="dropdown-menu">
                <a className="dropdown-item" href="#about">About Us</a>
                <a className="dropdown-item" href="#contact">Contact Us</a>
                <a className="dropdown-item" href="#codeofconduct">Code Of Conduct</a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#creaors">Explore More</a>
              </div>
            </li>
          </ul>
          {
            checkhello ? <a onClick={createProjectClick} className="btn btn-secondary">Create Project</a> : "Login To Create Project"
          }
          &nbsp;
          &nbsp;
          {
            checkhello ? <a onClick={LogoutClick} className="btn btn-danger">Logout</a> : <a href="/login" className="btn btn-primary">Login</a>
          }
        </div>
      </div>
    </nav>
  )
}
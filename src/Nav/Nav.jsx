export default function Nav() {
  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="/">ProjectHub</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarColor02">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <a class="nav-link" href="/projects">Project List</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/projects">Top Projects</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/users">Top Users</a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">More</a>
              <div class="dropdown-menu">
                <a class="dropdown-item" href="#about">About Us</a>
                <a class="dropdown-item" href="#contact">Contact Us</a>
                <a class="dropdown-item" href="#codeofconduct">Code Of Conduct</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#creaors">Explore More</a>
              </div>
            </li>
          </ul>
          <form class="d-flex">
            <input class="form-control me-sm-2" type="search" placeholder="Search" spellcheck="false" data-ms-editor="true" />
            <button class="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
  )
}
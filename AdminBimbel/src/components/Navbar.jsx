import React from "react";
export default function Navbar(){
    return(
      <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container">
        <a href="/">
          <img src="/img/logo.png" alt="Logo" width="50" height="54" className="d-inline-block align-text-center rotate-animation"  />
          Go-Smart
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ms-auto">
            <a href="/logout" className="btn btn-outline-danger">Log out!</a>
          </div>
        </div>
      </div>
    </nav>
    )
}
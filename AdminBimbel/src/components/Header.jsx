import React from "react";
export default function Header(){
    return(
        <nav className="navbar navbar-expand-lg bg-body-transparent">
    <div className="container">
        <a className="navbar-brand" href="#">
            <img src="/img/logo.png" alt="Logo" width="50" height="54" className="d-inline-block align-text-baseline"/>
            Go-Smart
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav ms-auto">
                <a className="nav-link active" aria-current="page" href="/">Home</a>
                <a className="nav-link" href="#Program">Program</a>
                <a className="nav-link" href="#About">About</a>
                <a className="nav-link" href="#Contac">Contac</a>
                <a className="nav-link btn btn-info" href="register">Daftar Sekarang!</a>
            </div>
        </div>
    </div>
</nav>
    )
}
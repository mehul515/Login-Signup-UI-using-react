import React from 'react'
import {Link} from "react-router-dom"

const Navbar = () => {
    return (
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">Navbar</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                        <Link class="nav-link active" aria-current="page" to="/home">Change Password</Link>
                        <Link class="nav-link" to="/login">Login</Link>
                        <Link class="nav-link" to="/register">Sign Up</Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
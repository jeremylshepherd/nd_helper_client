import React from 'react';
import { Link } from 'react-router-dom';
import '../nav/_component.nav.scss';

function Nav() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">ND <i className="far fa-life-ring"></i></Link>
                <button className="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>

                <div className="navbar-collapse collapse" id="navbarColor01">
                <ul className="navbar-nav me-auto">
                    <li className="nav-item">
                    <Link className="nav-link active" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to="/archive">Archive</Link>
                    </li>
                </ul>
                </div>
            </div>
        </nav>
    )
}

export default Nav;

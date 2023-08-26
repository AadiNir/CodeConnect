import React from 'react'
import { Link } from 'react-router-dom'
function Navbar() {
  return (
    <nav className="navbar bg-dark">
        <h1><a href="index.html"><i className='fas fa-code'></i> Devconnector</a>
        </h1>
        <ul>

            <li><a href="index.html">Developers</a></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
        </ul>


    </nav>
    )
}

export default Navbar
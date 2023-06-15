import React, { useEffect } from 'react';
import { Link, useNavigate , useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {}, [location]);
  const handleLogout= ()=>{
    localStorage.removeItem('token');
    navigate(0);
    navigate('/login')
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            iNoteBook
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === '/' ? 'active' : ''
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === '/about' ? 'active' : ''
                  }`}
                  to="/about"
                >
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === '/link' ? 'active' : ''
                  }`}
                >
                  Options
                </Link>
              </li>
            </ul>

            {!localStorage.getItem('token')?<form><Link className="btn btn-primary mx-2" to="/login#" role="button">Login</Link>
            <Link className="btn btn-primary mx-2" to="/signup" role="button">Signup</Link></form>:<button type="button" onClick={handleLogout} class="btn btn-primary mx-2">Logout</button>}
            
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;

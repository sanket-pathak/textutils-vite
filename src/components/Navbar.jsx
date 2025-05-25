import PropTypes from 'prop-types';
import { useEffect } from 'react';

const Navbar = ({ mode, title, toggleMode }) => {
  const contrastMode = mode === "light" ? "dark" : "light";
  
  // Initialize Bootstrap JS manually for React
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return (
    <nav className={`navbar navbar-expand-lg navbar-${mode} bg-${mode}`}>
      <div className="container-fluid mx-lg-5 mx-3"> {/* Better mobile padding */}
        <a className="navbar-brand" href="#">
          <strong>{title}</strong>
        </a>
        
        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className={`navbar-toggler-icon ${mode === 'dark' ? 'navbar-dark' : ''}`}></span>
        </button>

        {/* Collapsible Menu */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* <li className="nav-item">
              <a 
                className={`nav-link active ${mode === 'dark' ? 'text-light' : 'text-dark'}`} 
                aria-current="page" 
                href="#"
              >
                Home
              </a>
            </li> */}
            {/* <li className="nav-item">
              <a 
                className={`nav-link ${mode === 'dark' ? 'text-light' : 'text-dark'}`} 
                href="#"
              >
                About
              </a>
            </li> */}
          </ul>
          
          {/* Dark Mode Toggle - Moved inside collapsible area */}
          <div className={`form-check form-switch text-${contrastMode}`}>
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
              onChange={toggleMode}
              checked={mode === 'dark'}
            />
            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
              {mode === 'light' ? 'Dark Mode' : 'Light Mode'}
            </label>
          </div>
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired,
  toggleMode: PropTypes.func.isRequired,
};

Navbar.defaultProps = {
  title: 'TextUtils',
};

export default Navbar;
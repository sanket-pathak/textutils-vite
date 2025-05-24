import PropTypes from 'prop-types';

const Navbar = ({ mode, title, toggleMode }) => {
  const contrastMode = mode === "light" ? "dark" : "light";
  
  return (
    <nav className={`navbar navbar-expand-lg navbar-${mode} bg-${mode}`}>
      <div className="container-fluid mx-5">
        <a className="navbar-brand" href="#">
          <strong>{title}</strong>
        </a>
        
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className={`navbar-toggler-icon ${mode === 'dark' ? 'navbar-toggler-icon-dark' : ''}`}></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">About</a>
            </li>
          </ul>
          
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
              {mode === 'light' ? 'Enable Dark Mode' : 'Disable Dark Mode'}
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
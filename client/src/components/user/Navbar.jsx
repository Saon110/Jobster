import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const activeStyle = {
    color: '#fff', // Change the active link text color
    fontWeight: 'bold',
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#2c3e50', fontSize: '24px', padding: '30px 0', width: '100%' }}>
      <div className="container">
        <NavLink className="navbar-brand" to="/User/Home" activeStyle={activeStyle}>
          <span style={{ color: '#fff', fontSize: '30px', fontWeight: 'bold' }}>Jobster</span>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto" style={{ fontSize: '20px' }}> {/* Adjust font size */}
            <li className="nav-item">
              <NavLink className="nav-link" to="/User/Companies" activeStyle={activeStyle}>
                Companies
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/User/Jobs" activeStyle={activeStyle}>
                Jobs
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/User/Applications" activeStyle={activeStyle}>
                My Applications 
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/User/Interview" activeStyle={activeStyle}>
                Interviews
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/User/Notifications" activeStyle={activeStyle}>
                Notifications
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/User/JobHistory" activeStyle={activeStyle}>
                My Job History
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/User/Myprofile" activeStyle={activeStyle}>
                My Profile
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to={`/Employer/profile`} style={{ color: '#ff6347' }}>Profile</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li className="nav-item active">
                        <Link className="nav-link" to={`/Employer/jobs`} style={{ color: '#008000' }}>Jobs <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={`/Employer/employees`} style={{ color: '#0000ff' }}>Employees</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={`/Employer/applications`} tabIndex="-1" aria-disabled="true" style={{ color: '#800080' }}>Applications</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={`/Employer/interviews`} style={{ color: '#ffa500' }}>Upcoming Interviews</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={`/Employer/notifications`} style={{ color: '#ff69b4' }}>Notifications</Link>
                    </li>
                </ul>
                <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" />
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit" style={{ color: '#fff', backgroundColor: '#ff6347', borderColor: '#ff6347' }}>Search</button>
                </form>
            </div>
        </nav>
    );
};

export default Navbar;

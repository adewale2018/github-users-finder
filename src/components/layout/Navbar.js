import React from "react";
import "./Navbar.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Navbar = ({ title }) => {
  return (
    <header className='mb-4'>
      <nav className='navbar navbar-expand-lg navbar-light bg-info'>
        <h2>
          <Link className='navbar-brand text-dark' to='/' id='title'>
            <i className='fab fa-github-square' /> {title}
          </Link>
        </h2>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div
          className='collapse navbar-collapse mr-auto'
          id='navbarSupportedContent'
        >
          <ul className='navbar-nav'>
            <li className='nav-item active'>
              <Link id='navLink' className='nav-link' to='/'>
                Home <span className='sr-only'>(current)</span>
              </Link>
            </li>
            <li className='nav-item'>
              <Link id='navLink' className='nav-link' to='/about'>
                About
              </Link>
            </li>
            <li className='nav-item'>
              <Link id='navLink' className='nav-link' to='/contact'>
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};
Navbar.defaultProps = {
  title: "GitHub Finder"
};
Navbar.propTypes = {
  title: PropTypes.string.isRequired
};
export default Navbar;

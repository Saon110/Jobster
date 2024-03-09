// Footer.jsx

import React from 'react';
import { FaGoogle, FaFacebook, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        <div style={leftSectionStyle}>
          <h3 style={logoStyle}>Jobster</h3>
          <p style={textStyle}>&copy; 2024. All rights reserved.</p>
        </div>
        <div style={rightSectionStyle}>
          <div style={socialIconsStyle}>
            <a href="https://www.google.com" target="_blank" rel="noopener noreferrer">
              <FaGoogle size={20} style={iconStyle} />
            </a>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook size={20} style={iconStyle} />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram size={20} style={iconStyle} />
            </a>
          </div>
          <p style={textStyle}>Contact: info@jobster.com</p>
        </div>
      </div>
    </footer>
  );
};

const footerStyle = {
  backgroundColor: '#292b2c',
  color: '#fff',
  padding: '40px 0',
  width: '100%',
};

const containerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  margin: 'auto', // Center the content
  maxWidth: '1200px', // Add a max-width if needed
};

const leftSectionStyle = {
  flex: '1',
};

const rightSectionStyle = {
  textAlign: 'right',
};

const logoStyle = {
  fontSize: '1.5rem',
  fontWeight: 'bold',
  marginBottom: '10px',
};

const textStyle = {
  margin: '0',
};

const socialIconsStyle = {
  display: 'flex',
  alignItems: 'center',
};

const iconStyle = {
  color: '#fff',
  margin: '0 8px',
  cursor: 'pointer',
};

export default Footer;

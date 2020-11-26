import React from 'react';
import './Header.css';

/**
 * Header with logo
 * @returns {JSX.Element} Header
 */
const Header = () => {
  return (
    <div className="header">
      <img src='/logo192.png' className="header-logo" alt='' title="header-logo"/>
    </div>
  );
}

export default Header;

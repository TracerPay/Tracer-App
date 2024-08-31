import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './sidebar.component.css';
import { FaHome, FaUserShield, FaFileUpload, FaFileAlt, FaChevronDown, FaCog, FaDashcube } from 'react-icons/fa';
import { AiFillDashboard } from "react-icons/ai";

const Sidebar = ({ username, isAdmin, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isReportsOpen, setIsReportsOpen] = useState(false); // State for reports dropdown
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleReportsDropdown = () => {
    setIsReportsOpen(!isReportsOpen);
  };

  return (
    <>
      <div className={`sidebar ${isMobileMenuOpen ? 'open' : ''} ${isHovered ? 'hovered' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="logo">
          <Link to="/" onClick={toggleMobileMenu}>
            Tracer
          </Link>
        </div>
        <nav className="nav">
          <Link to="/admin-dashboard" onClick={toggleMobileMenu}>
            <AiFillDashboard className="nav-icon" />
            <span className="nav-text">Dash</span>
          </Link>
          <div className="dropdown" onClick={toggleReportsDropdown}>
            <div className="dropdown-toggle">
              <FaFileAlt className="nav-icon" />
              <span className="nav-text">Reports</span>
              <FaChevronDown className={`chevron ${isReportsOpen ? 'open' : ''}`} />
            </div>
            {isReportsOpen && (
              <div className="dropdown-menu">
                <Link to="/billing-reports" onClick={toggleMobileMenu} className="dropdown-item">
                  Billing Reports
                </Link>
                <Link to="/ar-reports" onClick={toggleMobileMenu} className="dropdown-item">
                  AR Reports
                </Link>
              </div>
            )}
          </div>
        </nav>
        <div className="sidebar-footer">
          {username ? (
            <>
              <div className="profile-section">
                <Link to={`/user-settings/${username}`} className="connected profile-link">
                  <div className="wallet-info">
                    <FaCog className="settings-icon" />
                    <span>{username}</span>
                  </div>
                </Link>
              </div>
              <button onClick={onLogout} className="logout-button">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="pill-button">
              Login
            </Link>
          )}
          <div className="theme-toggle-container">
            <label className="switch">
              <input
                type="checkbox"
                checked={theme === 'dark'}
                onChange={toggleTheme}
              />
              <span className="slider round"></span>
            </label>
            <span className="theme-label">Dark Mode</span>
          </div>
        </div>
        {isMobileMenuOpen && <div className="overlay show" onClick={toggleMobileMenu}></div>}
      </div>
      <div className="hamburger" onClick={toggleMobileMenu}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
    </>
  );
};

export default Sidebar;

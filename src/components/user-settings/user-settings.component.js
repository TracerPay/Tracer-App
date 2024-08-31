// src/components/user-settings/user-settings.component.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './user-settings.component.css';

const UserSettings = ({ username, email, onUpdateProfile, onChangePassword, onThemeToggle, theme, isAdmin }) => {
  const [newUsername, setNewUsername] = useState(username);
  const [newEmail, setNewEmail] = useState(email);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChangePasswordVisible, setIsChangePasswordVisible] = useState(false);

  const handleProfileUpdate = () => {
    onUpdateProfile(newUsername, newEmail);
  };

  const handleChangePassword = () => {
    if (newPassword === confirmPassword) {
      onChangePassword(currentPassword, newPassword);
    } else {
      alert('Passwords do not match!');
    }
  };

  return (
    <div className="user-settings-container">
      <h2>User Settings</h2>
      <div className="form-group">
        <label>Username</label>
        <input
          type="text"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
        />
      </div>
      <button className="save-button" onClick={handleProfileUpdate}>
        Save Profile
      </button>

      <button
        className="toggle-password-button"
        onClick={() => setIsChangePasswordVisible(!isChangePasswordVisible)}
      >
        {isChangePasswordVisible ? 'Hide Change Password' : 'Change Password'}
      </button>

      {isChangePasswordVisible && (
        <>
          <h3>Change Password</h3>
          <div className="form-group">
            <label>Current Password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button className="save-button" onClick={handleChangePassword}>
            Change Password
          </button>
        </>
      )}

      {isAdmin && (
        <div className="manage-users-link">
          <Link to="/manage-team" className="manage-team-button">
            Manage Team
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserSettings;

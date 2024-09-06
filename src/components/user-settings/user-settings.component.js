import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { updateUser } from '../../api/users.api';
import './user-settings.component.css';

const UserSettings = ({ organizationID, username, email, onUpdateProfile, onChangePassword, isAdmin }) => {
  const [newUsername, setNewUsername] = useState(username);
  const [newEmail, setNewEmail] = useState(email);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChangePasswordVisible, setIsChangePasswordVisible] = useState(false);
  const [showManageTeam, setShowManageTeam] = useState(isAdmin);

  useEffect(() => {
    // Ensure showManageTeam gets updated as soon as isAdmin changes
    setShowManageTeam(isAdmin);
  }, [isAdmin]);

  const handleProfileUpdate = () => {
    onUpdateProfile(newUsername, newEmail);
    const updatedUser = {
      username: newUsername,
      email: newEmail,
    };
    updateUser(username, updatedUser);
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

      {showManageTeam && (
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

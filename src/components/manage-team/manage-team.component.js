// src/components/manage-team/manage-team.component.js
import React, { useState, useEffect } from 'react';
import './manage-team.component.css';
import { getUsers, createUser, deleteUser } from '../../api/users.api';

const ManageTeam = ({ authToken, organizationID }) => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ fName: '', lName: '', email: '' });
  const [newUserCredentials, setNewUserCredentials] = useState(null); // Store generated username and password
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);
  
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const fetchedUsers = await getUsers(organizationID, authToken);
      setUsers(fetchedUsers || []); // Ensure it's always an array
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Failed to load users.');
      setLoading(false);
    }
  };

  const handleAddUser = async () => {
    try {
      const response = await createUser(organizationID, newUser, authToken);
      setNewUser({ fName: '', lName: '', email: '' });
      setNewUserCredentials(response); // Store the returned username and password
      fetchUsers(); // Refresh the users list after adding a new user
    } catch (error) {
      console.error('Error adding user:', error);
      setError('Failed to add user.');
    }
  };

  const handleDeleteUser = async (username) => {
    if (window.confirm(`Are you sure you want to remove ${username}?`)) {
      try {
        await deleteUser(organizationID, username, authToken);
        fetchUsers(); // Refresh the users list after removing a user
      } catch (error) {
        console.error('Error removing user:', error);
        setError('Failed to remove user.');
      }
    }
  };

  return (
    <div className="manage-team-container">
      <h2>Manage Team</h2>

      {loading && <p>Loading users...</p>}
      {error && <p className="error-message">{error}</p>}

      <ul className="user-list">
        {users.map((user, index) => (
          <li key={index}>
            <span>{user.fName} {user.lName} ({user.username})</span> {/* Display full name and username */}
            <span>{user.email}</span> {/* Display email */}
            {user.isAdmin && <span className="admin-badge">Admin</span>} {/* Display Admin badge if user is an admin */}
            <button className="delete-button" onClick={() => handleDeleteUser(user.username)}>Remove</button>
          </li>
        ))}
      </ul>

      <h3>Add New User</h3>
      <div className="form-group">
        <label>First Name</label>
        <input
          type="text"
          value={newUser.fName}
          onChange={(e) => setNewUser({ ...newUser, fName: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label>Last Name</label>
        <input
          type="text"
          value={newUser.lName}
          onChange={(e) => setNewUser({ ...newUser, lName: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
      </div>
      <button className="save-button" onClick={handleAddUser}>
        Add User
      </button>

      {newUserCredentials && (
        <div className="new-user-credentials">
          <h4>New User Credentials</h4>
          <p>Username: {newUserCredentials.username}</p>
          <p>Password: {newUserCredentials.password}</p>
        </div>
      )}
    </div>
  );
};

export default ManageTeam;

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link
import { signup } from '../../api/authApi.js';

function Signup() {
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [organization, setOrganization] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  const validatePassword = (pw) => {
    if (pw.length < 8) {
      return { isValid: false, error: 'Password must be at least 8 characters long' };
    }
    if (!/[A-Z]/.test(pw)) {
      return { isValid: false, error: 'Password must contain at least one uppercase letter' };
    }
    if (!/[a-z]/.test(pw)) {
      return { isValid: false, error: 'Password must contain at least one lowercase letter' };
    }
    if (!/[0-9]/.test(pw)) {
      return { isValid: false, error: 'Password must contain at least one number' };
    }
    if (!/[^A-Za-z0-9]/.test(pw)) {
      return { isValid: false, error: 'Password must contain at least one special character' };
    }
    return { isValid: true };
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple client-side validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    const { isValid, error: passwordError } = validatePassword(password);
    if (!isValid) {
      setError(passwordError);
      return;
    }
    

    try {
      const user = {
        fName,
        lName,
        organization,
        username,
        password,
      };
      const response = await signup(user);
      console.log(response);
      if (response.isDupe) {
        console.log(response);
        setError('Sorry, that Username already Exists');
      } else if (response.userID) {
        console.log(response);
        setSuccess(`Signup successful! You can now log in. Welcome ${response.username}.`);
        setError('');
        navigate('/login');
      }
    } catch (error) {
      setError('Signup failed. Please try again.');
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            value={fName}
            onChange={(e) => setFName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            value={lName}
            onChange={(e) => setLName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Organization:</label>
          <input
            type="text"
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default Signup;

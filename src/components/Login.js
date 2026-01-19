import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const { login, logout, isLoggedIn, userName: currentUser, role: currentRole } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    if (userName.trim() && password.trim()) {
      login(userName, role);
      setUserName('');
      setPassword('');
    }
  };

  if (isLoggedIn) {
    return (
      <div>
        <h3>Welcome, {currentUser}!</h3>
        <p>Role: {currentRole}</p>
        <button onClick={logout}>Logout</button>
      </div>
    );
  }

  return (
    <div>
      <h3>Login</h3>
      <form onSubmit={handleLogin}>
        <div>
          <input
            type="text"
            placeholder="Enter username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <select 
            value={role} 
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
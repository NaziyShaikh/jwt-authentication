import React, { useState } from 'react';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok && data.token) {
        onLogin(data.token);
        setUsername('');
        setPassword('');
      } else {
        setMessage(data.message || 'Login failed');
      }
    } catch (error) {
      setMessage('Error connecting to server');
    }
  };

  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: 8,
      padding: 20,
      maxWidth: 400,
      margin: '20px auto',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f9f9f9'
    }}>
      <h2 style={{ textAlign: 'center', color: '#333' }}>Login</h2>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: 'block', marginBottom: 4, fontWeight: 'bold' }}>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: 'block', marginBottom: 4, fontWeight: 'bold' }}>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
          />
        </div>
        <button
          type="submit"
          style={{
            width: '100%',
            padding: 10,
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: 16
          }}
        >
          Login
        </button>
      </form>
      {message && <p style={{ marginTop: 12, textAlign: 'center', color: 'red' }}>{message}</p>}
    </div>
  );
}

export default Login;

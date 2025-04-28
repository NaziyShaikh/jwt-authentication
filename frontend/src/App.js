import React, { useState } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import Protected from './components/Protected';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const handleLogin = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h1>JWT Authentication Demo</h1>
      {!token ? (
        <>
          <Register />
          <hr />
          <Login onLogin={handleLogin} />
        </>
      ) : (
        <>
          <button onClick={handleLogout}>Logout</button>
          <Protected token={token} />
        </>
      )}
    </div>
  );
}

export default App;

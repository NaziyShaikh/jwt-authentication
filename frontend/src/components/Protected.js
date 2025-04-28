import React, { useEffect, useState } from 'react';

function Protected({ token }) {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProtected = async () => {
      setError('');
      setMessage('');
      try {
        const response = await fetch('https://jwt-authentication-vly4.onrender.com/protected', {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setMessage(data.message);
        } else {
          setError(data.message || 'Failed to access protected route');
        }
      } catch (err) {
        setError('Error connecting to server');
      }
    };
    fetchProtected();
  }, [token]);

  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: 8,
      padding: 20,
      maxWidth: 400,
      margin: '20px auto',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f9f9f9',
      textAlign: 'center'
    }}>
      <h2 style={{ color: '#333' }}>Protected Route</h2>
      {message && <p style={{ color: 'green', fontWeight: 'bold' }}>{message}</p>}
      {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}
    </div>
  );
}

export default Protected;

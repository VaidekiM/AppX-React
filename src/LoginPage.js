import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'; // 1. Import useHistory
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';


function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const history = useHistory(); // 2. Get history object

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5232/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }
      const authToken = data.token;

      //Store the token in localStorage (or sessionStorage) - added this after back trigger in login
      localStorage.setItem('authToken', authToken);
      history.push('/landing');
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: "'Poppins', sans-serif" }}>
      {/* Left Section */}
      <div style={{
        width: '70vw',
        background: '#73C6B6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: '3rem',
        borderTopRightRadius: '10px',
        borderBottomRightRadius: '10px',
        boxShadow: '4px 0 15px rgba(0, 0, 0, 0.1)',
      }}>
        <img 
          src="/images/loginPageImg.jpg" 
          alt="Shopping Icon"
          style={{ width: '400px', marginBottom: '10px', objectFit: 'contain' }} 
        />

        <h1 style={{
          fontSize: '45px',
          color: '#2E4053',
          marginBottom: '20px',
          fontFamily: "'Poppins', sans-serif",
          fontWeight: '700',
          textAlign: 'center'
        }}>
          Welcome to <span style={{ color: '#E74C3C' }}>AppX</span>
        </h1>

        <p style={{
          fontSize: '20px',
          color: '#4D5656',
          maxWidth: '600px',
          textAlign: 'center',
          marginBottom: '30px'
        }}>
          Discover the best deals and exclusive collections. Log in to start your shopping experience!
        </p>

        <button style={{
          padding: '15px 30px',
          fontSize: '18px',
          backgroundColor: '#E74C3C',
          color: 'white',
          border: 'none',
          borderRadius: '30px',
          cursor: 'pointer',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
        }}>
          Shop Now
        </button>
      </div>

      {/* Right Section (Login Form) */}
      <div style={{
        width: '30vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '40px',
        backgroundColor: '#f8f9fa',
        boxShadow: '-5px 0 10px rgba(0,0,0,0.05)'
      }}>
        <div style={{
          fontSize: '32px',
          fontWeight: 700,
          marginBottom: '30px',
          background: 'linear-gradient(90deg, #3a0ca3, #f72585)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '1px',
          textAlign: 'center'
        }}>
          Sign In
        </div>
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '20px', position: 'relative', width: '90%'}}>
            <label style={{ fontWeight: 500 }}>Username</label><br />
            {/* Font Awesome icon */}
            <FontAwesomeIcon
              icon={faUser}
              className="icon"
              style={{
                position: 'absolute',
                top: '65%',
                left: '15px',
                transform: 'translateY(-50%)',
                color: '#888'
              }}
            ></FontAwesomeIcon>

            {/* Input with padding for icon */}
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '15px 15px 15px 45px', // padding-left for icon space
                marginTop: '5px',
                borderRadius: '20px',
                border: '1px solid #ccc',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px', position: 'relative', width: '90%' }}>
            <label style={{ fontWeight: 500 }}>Password</label><br />

            {/* Font Awesome icon */}
            <FontAwesomeIcon
              icon={faLock}
              className="icon"
              style={{
                position: 'absolute',
                top: '65%',
                left: '15px',
                transform: 'translateY(-50%)',
                color: '#888'
              }}
            ></FontAwesomeIcon>

            {/* Input with padding for icon */}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '15px 15px 15px 45px',
                marginTop: '5px',
                borderRadius: '20px',
                border: '1px solid #ccc',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
            />
          </div>
          <button type="submit" className="loginRegiterButton">
            Login
          </button>
          <button type="submit" className="loginRegiterButton">
            Register
          </button>
        </form>
        {message && (
          <p style={{
            color: 'red',
            textAlign: 'center'
          }}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default LoginPage;

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const history = useHistory();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch('http://localhost:5232/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      setMessage("Registration successful! Redirecting to login...");
      setTimeout(() => history.push('/'), 2000);
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: "'Poppins', sans-serif" }}>
      {/* Left Section (Welcome) */}
      <div style={{
        width: '70vw', background: '#73C6B6',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexDirection: 'column', padding: '3rem',
        borderTopRightRadius: '10px', borderBottomRightRadius: '10px',
        boxShadow: '4px 0 15px rgba(0, 0, 0, 0.1)'
      }}>
        <h1 style={{ fontSize: '45px', color: '#2E4053', marginBottom: '20px', fontWeight: '700', textAlign: 'center' }}>
          Create Your <span style={{ color: '#E74C3C' }}>AppX</span> Account
        </h1>
        <p style={{
          fontSize: '20px', color: '#4D5656', maxWidth: '600px',
          textAlign: 'center', marginBottom: '30px'
        }}>
          Join now to explore the best shopping deals and collections!
        </p>
      </div>

      {/* Right Section (Register Form) */}
      <div style={{
        width: '30vw', display: 'flex', flexDirection: 'column',
        justifyContent: 'center', padding: '40px', backgroundColor: '#f8f9fa',
        boxShadow: '-5px 0 10px rgba(0,0,0,0.05)'
      }}>
        <div style={{
          fontSize: '32px', fontWeight: 700, marginBottom: '30px',
          background: 'linear-gradient(90deg, #3a0ca3, #f72585)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          textAlign: 'center'
        }}>
          Register
        </div>

        <form onSubmit={handleRegister}>
          {/* Username */}
          <div style={{ marginBottom: '20px', position: 'relative', width: '90%' }}>
            <label style={{ fontWeight: 500 }}>Username</label><br />
            <FontAwesomeIcon icon={faUser} style={{
              position: 'absolute', top: '65%', left: '15px',
              transform: 'translateY(-50%)', color: '#888'
            }} />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{
                width: '100%', padding: '15px 15px 15px 45px', marginTop: '5px',
                borderRadius: '20px', border: '1px solid #ccc', fontSize: '16px'
              }}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: '20px', position: 'relative', width: '90%' }}>
            <label style={{ fontWeight: 500 }}>Password</label><br />
            <FontAwesomeIcon icon={faLock} style={{
              position: 'absolute', top: '65%', left: '15px',
              transform: 'translateY(-50%)', color: '#888'
            }} />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%', padding: '15px 15px 15px 45px', marginTop: '5px',
                borderRadius: '20px', border: '1px solid #ccc', fontSize: '16px'
              }}
            />
          </div>

          {/* Confirm Password */}
          <div style={{ marginBottom: '20px', position: 'relative', width: '90%' }}>
            <label style={{ fontWeight: 500 }}>Confirm Password</label><br />
            <FontAwesomeIcon icon={faLock} style={{
              position: 'absolute', top: '65%', left: '15px',
              transform: 'translateY(-50%)', color: '#888'
            }} />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              style={{
                width: '100%', padding: '15px 15px 15px 45px', marginTop: '5px',
                borderRadius: '20px', border: '1px solid #ccc', fontSize: '16px'
              }}
            />
          </div>

          {/* Register Button */}
          <button type="submit" style={{
            padding: '12px', backgroundColor: '#3498DB', color: '#fff',
            border: 'none', borderRadius: '20px', fontSize: '16px',
            fontWeight: 600, cursor: 'pointer', width: '90%'
          }}>
            Register
          </button>

          {/* Back to Login */}
          <p style={{ marginTop: '15px', textAlign: 'center', color: '#333' }}>
            Already have an account?{" "}
            <span style={{ color: '#E74C3C', cursor: 'pointer' }} onClick={() => history.push('/')}>
              Login Here
            </span>
          </p>
        </form>

        {message && (
          <p style={{
            color: message.includes('successful') ? 'green' : 'red',
            marginTop: '15px', textAlign: 'center'
          }}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default RegisterPage;

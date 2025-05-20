  import React from 'react';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { faUser, faShoppingCart, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
  import { useHistory } from 'react-router-dom';

  function Header() {
    const history = useHistory();

    // Logout function
    const handleLogout = () => {
      localStorage.removeItem('authToken');
      history.replace('/');
    };

    const handleCartIconClick = () => {
      // Push current location (referrer) to the cart page state
      history.push('/cart', { from: history.location.pathname });
    };

    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #ffeed9',
          padding: '18px 20px',
          zIndex: '10',
          boxShadow: '0 4px 12px #ffeed9'
        }}
      >
        <div
          style={{
            fontSize: '32px',
            fontWeight: 600,
            fontFamily: "'Poppins', sans-serif",
            background: 'linear-gradient(90deg, #3a0ca3, #f72585)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '1px',
            textShadow: '1px 1px 1px rgba(0, 0, 0, 0.1)'
          }}
        > AppX
        </div>

        {/* Right content */}
        <div
          style={{
            display: 'flex',
            gap: '20px',
            alignItems: 'center',
            fontSize: '20px',
            cursor: 'pointer'
          }}
        >
          {/* Profile Icon */}
          <FontAwesomeIcon
            icon={faUser}
            className="icon"
            title="Profile"
          />

          {/* Cart Icon */}
          <FontAwesomeIcon
            icon={faShoppingCart}
            className="icon"
            title="View Cart"
            onClick={handleCartIconClick}
          />

          {/* Logout Icon */}
          <FontAwesomeIcon
            icon={faSignOutAlt}
            className="icon"
            title="Logout"
            onClick={handleLogout}  // Add onClick event for logout
          />
        </div>
      </div>
    );
  }

  export default Header;

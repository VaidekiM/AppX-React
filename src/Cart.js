import React from 'react';
import { useCart } from './CartContext';
import Header from './Header';
import { useHistory, useLocation } from 'react-router-dom';  // Import useHistory

function Cart() {
  const { cartItems } = useCart(); // Get cart items from context
  const history = useHistory(); // Get history from useHistory
  const location = useLocation();

  const itemsInCart = Object.values(cartItems); // Now contains { product, quantity }

  const total = itemsInCart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const fromPage = history.location.state?.from || '/';
  const goBack = () => {
    // If the 'from' state contains a query string, we append it to the URL
    const searchParams = location.state?.search || '';
    history.push({
      pathname: fromPage, // Navigate back to the original page
      search: searchParams, // Preserve the query parameters from the previous page
    });
  };


  return (
    <>
      <Header />
      <div style={{
        maxWidth: '800px',
        margin: '120px auto 40px', // Top space for sticky header
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '12px',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
        fontFamily: "'Poppins', sans-serif"
      }}>
        <h2 style={{ marginBottom: '20px', color: '#3a0ca3' }}>🛒 Shopping Cart</h2>

        {/* Back Button */}
        <button
          onClick={goBack} // Go back to the previous page
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#3498db',
            color: '#fff',
            border: 'none',
            borderRadius: '25px',
            cursor: 'pointer',
            marginBottom: '20px',
          }}
        >
          Go Back
        </button>

        {itemsInCart.length === 0 ? (
          <p style={{ fontSize: '18px' }}>Your cart is empty.</p>
        ) : (
          <>
            <ul style={{ listStyle: 'none', padding: 0 }}>
            {itemsInCart.map((item, index) => (
              <li
                key={index}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '12px 0',
                  borderBottom: '1px solid #eee',
                  fontSize: '18px'
                }}
              >
                <span>{item.product.name}</span>
                <span>{item.quantity} × ${item.product.price.toFixed(2)}</span>
              </li>
            ))}
            </ul>

            <div style={{
              textAlign: 'right',
              marginTop: '20px',
              fontWeight: 'bold',
              fontSize: '20px',
              color: '#333'
            }}>
              Total: ${total.toFixed(2)}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Cart;

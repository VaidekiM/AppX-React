import React, { useState } from 'react';
import { useParams, useLocation, useHistory } from 'react-router-dom';

function ProductDetail() {
  const { fruitName } = useParams();
  const location = useLocation();
  const history = useHistory();
  const fruit = location.state?.fruit;
  const category = location.state?.category;
  const subcategory = location.state?.subcategory;
  const [imgSrc, setImgSrc] = useState(
    fruit?.img || `/images/${fruitName.toLowerCase()}.png`
  );
  return (
    <div style={{ display: 'flex', gap: '40px', padding: '20px' }}>
      {/* Left - Image */}
      <div style={{ flex: '1' }}>
        <img
          src={imgSrc}
          alt={fruitName}
          onError={() =>
            setImgSrc(`/images/${fruitName.toLowerCase()}.jpeg`)
          }
          style={{ width: '100%', maxHeight: '300px', objectFit: 'contain' }}
        />
        {/* Back Button */}
        <button onClick={() => history.push('/landing', { category, subcategory })}
          style={{
            marginTop: '20px',
            padding: '8px 16px',
            backgroundColor: '#ccc',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
          ← Back
        </button>

      </div>

      {/* Center - Details */}
      <div style={{ flex: '2' }}>
        <h1>{fruitName}</h1>
        <p style={{ fontSize: '18px' }}>A fresh and juicy {fruitName}. Get yours today!</p>
        <p><strong>In Stock:</strong> {fruit?.stock ?? 'N/A'}</p>
      </div>

      {/* Right - Add to Cart */}
      <div style={{ flex: '1', textAlign: 'center' }}>
        <h3>Add to Cart</h3>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '10px' }}>
          <button>-</button>
          <span>1</span>
          <button>+</button>
        </div>
        <button style={{ backgroundColor: '#ff6c37', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px' }}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetail;

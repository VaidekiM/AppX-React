import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';

function Product({ categoryId, subCategoryId, viewMode }) {
  const [products, setProducts] = useState([]);
  const { cartItems, addToCart, increaseQty, decreaseQty } = useCart();

  useEffect(() => {
    if (categoryId && subCategoryId) {
      fetch(`http://localhost:5232/api/product/filter?categoryId=${categoryId}&subCategoryId=${subCategoryId}`)
        .then(res => {
          if (!res.ok) throw new Error('Failed to fetch products');
          return res.json();
        })
        .then(data => setProducts(data))
        .catch(error => console.error('Error fetching products:', error));
    }
  }, [categoryId, subCategoryId]);
  
  return (
    <div style={{
      display: 'flex',
      flexDirection: viewMode === 'list' ? 'column' : 'row',
      flexWrap: viewMode === 'card' ? 'wrap' : 'nowrap',
      gap: '20px',
      padding: '10px',
      fontFamily: "'Poppins', sans-serif"
    }}>
      {products.length === 0 ? (
        <div>No products available.</div>
      ) : (
        products.map((product) => {
          const quantity = cartItems[product.name] || 0;

          return (
            <div
              key={product.id}
              style={{
                display: 'flex',
                flexDirection: viewMode === 'card' ? 'column' : 'row',
                alignItems: viewMode === 'card' ? 'center' : 'flex-start',
                justifyContent: 'space-between',
                width: viewMode === 'card' ? '180px' : '100%',
                borderRadius: '20px',
                padding: '16px',
                backgroundColor: '#ffffff',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.2s ease',
                textAlign: viewMode === 'card' ? 'center' : 'left'
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              <Link
                to={`/product/${product.name}`}
                state={{ product, categoryId, subCategoryId }}
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  display: 'flex',
                  flexDirection: viewMode === 'card' ? 'column' : 'row',
                  alignItems: viewMode === 'card' ? 'center' : 'flex-start',
                  gap: viewMode === 'card' ? '0' : '20px',
                  flex: 1
                }}
              >
                <img
                  src={`http://localhost:5232${product.productImage}`} // Backend should return full or relative path
                  alt={product.name}
                  style={{
                    width: viewMode === 'card' ? '100%' : '50px',
                    height: viewMode === 'card' ? '140px': '50px',
                    objectFit: 'contain',
                    borderRadius: '12px'
                  }}
                />
                <div>
                  <h3 style={{
                    marginTop: viewMode === 'card' ? '12px' : '0',
                    fontWeight: '600',
                    fontSize: '18px',
                    color: '#2E4053'
                  }}>{product.name}</h3>
                  {viewMode === 'list' && (
                    <p style={{ color: '#666', fontSize: '14px', marginTop: '4px' }}>
                      In stock: {product.stock}
                    </p>
                  )}
                </div>
              </Link>

              <div style={{
                marginTop: viewMode === 'card' ? '14px' : '0',
                display: 'flex',
                justifyContent: viewMode === 'card' ? 'center' : 'flex-end',
                alignItems: 'center'
              }}>
                {quantity === 0 ? (
                  <button
                    onClick={() => addToCart(product.name)}
                    style={{
                      padding: '10px 18px',
                      backgroundColor: '#E74C3C',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '25px',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer'
                    }}
                  >
                    Add to Cart
                  </button>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <button onClick={() => decreaseQty(product.name)} style={{ width: '30px', height: '30px', fontSize: '18px', backgroundColor: '#E74C3C', color: '#fff', border: 'none', borderRadius: '50%', cursor: 'pointer' }}>−</button>
                    <span style={{ fontWeight: '600' }}>{quantity}</span>
                    <button onClick={() => increaseQty(product.name)} style={{ width: '30px', height: '30px', fontSize: '18px', backgroundColor: '#2ECC71', color: '#fff', border: 'none', borderRadius: '50%', cursor: 'pointer' }}>+</button>
                  </div>
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default Product;

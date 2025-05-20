import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faThLarge, faList } from '@fortawesome/free-solid-svg-icons';
import Product from './Product';
import AddIcon from './AddIcons';
import Header from './Header';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

function LandingPage({ category, subcategory }) {
  const location = useLocation();
  const initialCategory = category || location.state?.category || '';
  const initialSubcategory = subcategory || location.state?.subcategory || '';
  const [openCategory, setOpenCategory] = useState(initialCategory);
  const [selectedItem, setSelectedItem] = useState(initialSubcategory);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('card');
  const [categories, setCategories] = useState({});
  const selectedCategory = categories[openCategory];
  const selectedSubCategory = selectedCategory?.subcategories.find(sub => sub.name === selectedItem);

  const categoryId = selectedCategory?.id;
  const subCategoryId = selectedSubCategory?.id;

  useEffect(() => {
    fetch('http://localhost:5232/api/category/with-subcategories')
      .then(res => res.json())
      .then(data => {
        console.log("Raw API response:", data); 
        const mappedCategories = {};
        data.forEach(item => {
          mappedCategories[item.categoryName] = {
            id: item.categoryId,
            subcategories: item.subcategories.map(sub => ({
              name: sub.subcategoryName,
              id: sub.subcategoryId,
            }))
          };
        });
        setCategories(mappedCategories);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const handleCategoryChange = (category) => {
    setOpenCategory(category); // Set main category
    setSelectedItem(null); // Reset subcategory selection
    history.push(`/landing?category=${category}`);
  };

  const handleSubCategoryClick = (subCategory) => {
    setSelectedItem(subCategory); // Set selected subcategory
    history.push(`/landing?category=${openCategory}&subcategory=${subCategory}`);
  };

  const liBaseStyle = {
    padding: '10px 12px',
    cursor: 'pointer',
    borderRadius: '6px',
    marginBottom: '5px',
    transition: 'background 0.2s ease-in-out',
    color: '#ff6c37',
  };

  // Filter categories based on search term
  const filteredCategories = Object.entries(categories || {}).filter(
    ([category]) => category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const history = useHistory();

  // Check if the user is logged in when the component mounts
  useEffect(() => {
    if (!localStorage.getItem('authToken')) {
      history.replace('/'); // Redirect to login page if not logged in
    }
  }, [history]);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      <Header />
      <div style={{ display: 'flex', height: '100vh', fontFamily: 'Arial, sans-serif', backgroundColor: '#f9f9f9' }}>
        {/* Sidebar */}
        <div className='sidebar-item'>
          <div style={{ position: 'relative', width: '200px' }}>
            <FontAwesomeIcon
              icon={faSearch}
              style={{
                position: 'absolute',
                left: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#888',
                pointerEvents: 'none',
              }}
            />
            <input
              type="text"
              placeholder="Search Categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: '8px 8px 8px 32px',
                width: '100%',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '14px',
              }}
            />
          </div>
          <AddIcon />
          <h3 style={{ color: '#ff6c37' }}>Collections</h3>
          <ul className = 'ulStyle'>
            {filteredCategories.map(([category, items]) => (
              <div key={category}>
                <li
                  style={liBaseStyle}
                  className={openCategory === category ? 'active' : ''}
                  onClick={() => handleCategoryChange(category)}
                >
                  {category}
                </li>
              </div>
            ))}
          </ul>
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, backgroundColor: '#ffffff', color: '#333', padding: '20px' }}>
          <div style={{ fontSize: '24px', fontWeight: '600', marginBottom: '10px' }}>
            Welcome, <span style={{ color: '#ff6c37' }}>User</span>!
          </div>

          {!openCategory && (
            <div style={{ fontSize: '18px', color: 'gray', marginBottom: '20px' }}>
              Please select a category to further explore.
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
          <button
            onClick={() => setViewMode(viewMode === 'card' ? 'list' : 'card')}
            style={{
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              fontSize: '20px',
              color: '#333',
            }}
            title={viewMode === 'card' ? 'Switch to List View' : 'Switch to Card View'}
          >
            <FontAwesomeIcon icon={viewMode === 'card' ? faList : faThLarge} />
          </button>
        </div>
          {openCategory && (
            <div>
              {/* Subcategory Nav Bar */}
              <div style={{ display: 'flex', padding: '1px 6px' }}>
              {categories[openCategory]?.subcategories?.map((sub) => (
                <div
                  key={sub.id}
                  onClick={() => handleSubCategoryClick(sub.name)}
                  style={{
                    margin: '0 20px',
                    cursor: 'pointer',
                    padding: '10px',
                    color: selectedItem === sub.name ? 'black' : 'gray',
                    borderBottom: selectedItem === sub.name ? '0.5px solid #ff6c37' : '',
                  }}
                >
                  {sub.name}
                </div>
              ))}
              </div>

              {/* Main Content for selected subcategory */}
              <div style={{ padding: '20px' }}>
                {/* {selectedItem
                  ? contentComponents[selectedItem] || <div>No content available for this subcategory.</div>
                  : <div>Please select a subcategory.</div>} */}
                  {selectedItem
                  ? <Product categoryId={categoryId} subCategoryId={subCategoryId} viewMode={viewMode} />
                  : <div>Please select a subcategory.</div>}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LandingPage;

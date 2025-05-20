import React from 'react';

function AddIcons() {
return (
    <div style={{ display: 'flex', gap: '5px', alignItems: 'center', marginTop: '18px', float: 'right' }}>
        <button
            onClick={() => console.log('Add clicked')}
            style={{
            padding: '5px 8px',
            backgroundColor: 'litegray',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
            }}
        > Add </button>

        <button
            onClick={() => console.log('Import clicked')}
            style={{
            padding: '5px 8px',
            backgroundColor: 'litegray',
            
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
            }}
        > Import </button>
    </div>
    )
}

export default AddIcons;
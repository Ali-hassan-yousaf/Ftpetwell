import React from 'react';

const PetFinder = () => {
  return (
    <div style={{ margin: 0, overflow: 'hidden' }}>
      <iframe
        src="https://cc9ccd35368989c2e0.gradio.live/"  
        title="Pet Finder"
        style={{
          border: 'none',
          width: '100vw',
          height: '100vh',
        }}
      />
    </div>
  );
};

export default PetFinder;

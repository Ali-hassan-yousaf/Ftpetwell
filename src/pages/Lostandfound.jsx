import React from 'react';

const PetFinder = () => {
  return (
    <div style={{ margin: 0, overflow: 'hidden' }}>
      <iframe
        src=" https://343ae49fdd74e25c2c.gradio.live"  
        title="Pet Finder"
        style={{
          border: 'none',
          width: '100vw',
          height: '100vh',
        }}
      />
      <div style={{ height: '100%' }} />
    </div>
  );
};

export default PetFinder;

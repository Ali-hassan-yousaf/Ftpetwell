import React from 'react';

const PetFinder = () => {
  return (
    <div style={{ margin: 0, padding: 0 }}>
      <iframe
        src="https://279f47383372d2a655.gradio.live"
        title="Pet Finder"
        style={{
          border: 'none',
          width: '100vw',
          height: '300vh',
          display: 'block',
        }}
      />
      {/* Extra space after iframe */}
{/*       <div style={{ height: '100vh' }} />
    </div> */}
  );
};

export default PetFinder;

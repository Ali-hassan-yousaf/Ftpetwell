import React from 'react';

const PetFinder = () => {
  return (
    <div style={{ margin: 0, padding: 0 }}>
      <iframe
        src="https://a74aabd3790a70b3e2.gradio.live"
        title="Pet Finder"
        style={{
          border: 'none',
          width: '100vw',
          height: '100vh',
          display: 'block',
        }}
      />
      {/* Extra space after iframe */}
      <div style={{ height: '100vh' }} />
    </div>
  );
};

export default PetFinder;

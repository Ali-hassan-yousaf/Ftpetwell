import React from 'react';

const PetFinder = () => {
  return (
    <div style={{ margin: 0, padding: 0 }}>
      <iframe
        src="https://e5d0557481cec0606c.gradio.live"
        title="Pet Finder"
        style={{
          border: 'none',
          width: '100vw',
          height: '300vh',
          display: 'block',
        }}
      ></iframe>
    </div>
  );
};

export default PetFinder;

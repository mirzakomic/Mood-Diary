import React from 'react';
import '../style/loading.css'

const Loader = ({ text = 'Loading...', size = 40, color = '#fff' }) => {
  return (
    <div className="loading-container">
      <div
        className="loading-spinner"
        style={{ width: size, height: size, borderColor: color }}
      ></div>
      <p>{text}</p>
    </div>
  );
};

export default Loader;
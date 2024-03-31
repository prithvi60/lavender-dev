import React, { useState } from 'react';

import emptyLogo from '../../../assets/emptyImageSquare.png';

const CategoryPanel = () => {
  const [clickedImages, setClickedImages] = useState([]);

  const handleClick = (index) => {
    if (clickedImages.includes(index)) {
      setClickedImages(clickedImages.filter((clickedIndex) => clickedIndex !== index));
    } else {
      setClickedImages([...clickedImages, index]);
    }
  };

  const isClicked = (index) => clickedImages.includes(index);

  return (
    <div className="category-grid">
      {[1, 2, 3, 4, 5, 6].map((index) => (
        <div
          key={index}
          className={`category-container ${isClicked(index) ? 'clicked' : ''}`}
          onClick={() => handleClick(index)}
        >
          <img src={emptyLogo} alt={`Image ${index}`} />
          {isClicked(index) && (
            <div className="close-button" onClick={() => handleClick(index)}>X</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CategoryPanel;

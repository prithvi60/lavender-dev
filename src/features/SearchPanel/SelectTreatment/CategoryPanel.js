import React, { useState } from 'react';
import {categories} from '../../../constants/constants.js'
import GetImage from '../../../assets/GetImage.tsx';

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
      {categories.map((item,index) => (
        <div
          key={index}
          className={`category-container ${isClicked(index) ? 'clicked' : ''}`}
          onClick={() => handleClick(index)}
        >
        <GetImage className='cursor-pointer' imageName={item.image} />
          {isClicked(index) && (
            <div className="close-button" onClick={() => handleClick(index)}>X</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CategoryPanel;

const styles = {
  header: {
    fontSize: '18px',
    fontWeight: 700,
    color: '#4D4D4D'
  }
}
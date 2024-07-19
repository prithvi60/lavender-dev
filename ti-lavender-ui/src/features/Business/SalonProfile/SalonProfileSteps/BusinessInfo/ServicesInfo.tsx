import { Card, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import GetImage from '../../../../../assets/GetImage';
import { categories } from '../../../../../constants/constants';

export const ServicesInfo = () => {
  return (
    <div style={{ paddingTop: '20px', paddingBottom: '20px' }}>
    <Card sx={{ alignContent: 'center', width: '100%', padding: '20px' }}>
        <Grid item xs={5} md={5} lg={5} className="grid">
            {/* <Text variant="body1" className="bold" align="left" name="Categories"/> */}
            <Typography sx={{ fontSize: '18px', fontWeight: '700', color: '#4D4D4D', textAlign: 'start' }}>Services</Typography>
            <CategoryPanel />
        </Grid>
    </Card>
    </div>
  )
}

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

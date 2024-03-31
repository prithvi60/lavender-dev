import React, { useState } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import { Typography } from '@mui/material';


const ImageUploader = ({ images, setImages }) => {
    // const [images, setImages] = useState([]);

    const handleImageChange = (e) => {
      const files = e.target.files;
      const newImages = [];
  
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
  
        reader.readAsDataURL(file);
  
        reader.onload = () => {
          newImages.push(reader.result);
          if (newImages.length === files.length) {
            setImages('images', [...images, ...newImages]);
          }
        };
      }
    };
  
    const removeImage = (indexToRemove) => {
      const newImages = images?.filter((image, index) => index !== indexToRemove);
      setImages('images', newImages);
    };
  
    return (
      <div className='image-uploader-div'>
        {images?.map((image, index) => (
          <div className='image-thumbnail' key={index}>
            <img src={image} alt={`Image ${index + 1}`}/>
            <button onClick={() => removeImage(index)}>
              <ClearIcon />
            </button>
          </div>
        ))}
        <label htmlFor="image-upload">
            <Typography>
                {"Add Image"}
            </Typography>
        </label>
        <input type="file" accept="image/*" multiple onChange={handleImageChange} id="image-upload" />
      </div>
    );
}

export default ImageUploader;
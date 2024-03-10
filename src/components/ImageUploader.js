import React, { useState } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import { Typography } from '@mui/material';


const ImageUploader = () => {
    const [images, setImages] = useState([]);

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
            setImages([...images, ...newImages]);
          }
        };
      }
    };
  
    const removeImage = (indexToRemove) => {
      const newImages = images.filter((image, index) => index !== indexToRemove);
      setImages(newImages);
    };
  
    return (
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
        {images.map((image, index) => (
          <div key={index} style={{ position: 'relative', width: '90px', height: '90px', margin: '5px', borderRadius: '5px', overflow: 'hidden' }}>
            <img src={image} alt={`Image ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <button onClick={() => removeImage(index)} style={{ position: 'absolute', top: '5px', right: '5px', background: 'none', border: 'none', cursor: 'pointer', color: '#fff' }}>
              <ClearIcon />
            </button>
          </div>
        ))}
        <label htmlFor="image-upload" style={{ cursor: 'pointer', width: '90px', height: '90px', border: '2px dashed #ccc', padding: '10px', margin: '5px' }}>
            <Typography style={{ textAlign:"center", justifyContent:"center" }}>
                {"Add Image"}
            </Typography>
        </label>
        <input type="file" accept="image/*" multiple onChange={handleImageChange} style={{ display: 'none' }} id="image-upload" />
      </div>
    );
}

export default ImageUploader;
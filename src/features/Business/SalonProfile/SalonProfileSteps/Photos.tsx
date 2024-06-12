import React, { useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import GetIcon from '../../../../assets/Icon/icon';

export const Photos = () => {

  return (
    <ImageUploader />
  );
};

const ImageUploader = () => {
  const [image, setImage] = useState(null); // State to hold the uploaded image
  const [previewUrl, setPreviewUrl] = useState(''); // State to hold the image preview URL

  const handleDragOver = (event) => {
    event.preventDefault();
    // Prevent default handling (e.g., opening the image as a link)
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();

    // Get the dropped image file
    const imageFile = event.dataTransfer.files[0];
    setImage(imageFile);
    setPreviewUrl(URL.createObjectURL(imageFile)); // Create a preview URL
  };

  return (
    <div className="wrapper">
      <div className="drop_zone" onDragOver={handleDragOver} onDrop={handleDrop}>
        <p>Drag and drop image here...</p>
      </div>
      {/* Display the image preview */}
      {previewUrl && <img src={previewUrl} alt="Uploaded" />}
    </div>
  );
};


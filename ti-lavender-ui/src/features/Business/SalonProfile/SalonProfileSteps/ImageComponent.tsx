import React, { useState } from 'react';

const ImageComponent = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchImage = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://api.example.com/download-image', {
        method: 'GET',
        headers: {
          'Content-Type': 'image/jpeg', // Adjust content type as per your API
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch image');
      }

      const imageBlob = await response.blob();
      const imageUrl = URL.createObjectURL(imageBlob);
      setImageUrl(imageUrl);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const handleClick = () => {
    fetchImage();
  };

  return (
    <div>
      <button onClick={handleClick}>Fetch Image</button>
      <br />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {imageUrl && <img src={imageUrl} alt="Dynamic API Image" />}
    </div>
  );
};

export default ImageComponent;

import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import endpoint from '../../api/endpoints';
import { useSelector } from 'react-redux';

const AvatarImg = ({ row, establishmentId }) => {
  const [imageUrl, setImageUrl] = useState('');
  useEffect(() => {
    const fetchImageUrl = async () => {
      const url = await fetchImage(row, establishmentId);
      setImageUrl(url);
    };

    fetchImageUrl();
  }, [row]);

  const fetchImage = async (image, establishmentId) => {
    try {
      const response = await endpoint.getImages(image, establishmentId);
  
      const imageUrl: string = URL.createObjectURL(response.data);
      return imageUrl
    } catch (error) {
      
    }
  };


  return (
    <div className="flex items-center">
      <Avatar src={imageUrl} style={{ backgroundColor: '#1B1464' }} />
    </div>
  );
};

export default AvatarImg;

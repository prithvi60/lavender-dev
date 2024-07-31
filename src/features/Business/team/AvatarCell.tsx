import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import endpoint from '../../../api/endpoints';

const AvatarCell = ({ row }) => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchImageUrl = async () => {
      const url = await fetchImage(row?.original?.profileImage, "EST00002521");
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
      <div className="ml-2">{row.original.employeeName}</div>
    </div>
  );
};

export default AvatarCell;

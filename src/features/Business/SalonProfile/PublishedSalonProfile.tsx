import { Box, useMediaQuery } from '@mui/material'
import React, { useEffect, useState } from 'react'
import endpoint from '../../../api/endpoints';
import { useSelector } from 'react-redux';
import Text from '../../../components/Text';
import { convertDateToReadAbleDate } from '../../../utils/TimeFormat';

export const PublishedSalonProfile = ({basicInfo, estImages, lastModified}) => {
    console.log("basicInfo : ", basicInfo)
    console.log("estImages : ", lastModified)

    const userDetails = useSelector((state: any) => {
        return state?.currentUserDetails;
      });
    
    const establishmentId =
    userDetails != null ? userDetails?.establishmentId : "";
        
  const [imageUrls, setImageUrls] = useState([]);
  const isMobile = useMediaQuery('(max-width:600px)');
  const [loading, setLoading] = useState(false);

    
  const fetchImage = async (image) => {
    try {
      setLoading(true);
      const response = await endpoint.getImages(
        image,
        establishmentId
      );

      const imageUrl = URL.createObjectURL(response.data);
      return imageUrl;
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    const callFetchImageApi = async () => {
      const urls = [];
      for (const imageId of estImages) {
        const imageUrl = await fetchImage(imageId);
        urls.push(imageUrl);
      }
      setImageUrls(urls);
      setLoading(false);
    };
    if (estImages?.length > 0) {
      callFetchImageApi();
    }
  }, [estImages]);
  
  return (
    <Box>
        <Box>
            <Box sx={{display: 'flex'}}>
                {imageUrls?.map((url, index) => (
                    <img
                      key={index}
                      src={url}
                      alt={`Images ${index}`}
                      style={{
                        width: "200px",
                        height: "140px",
                        borderRadius: isMobile ? '0' : '20px',
                      }}
                   
                    />
                ))}
            </Box>
        </Box>
        <Box>
            <Text name={basicInfo?.establishmentName}/>
            <Text name={basicInfo?.cityCode}/>
            <Text name={`Last updated on ${lastModified ? convertDateToReadAbleDate(lastModified): ''}`}/>

        </Box>
    </Box>
  )
}

import React, { useEffect, useState } from 'react'
import Buttons from '../../../../components/Button'
import { publish } from '../../../../api/constants'
import endpoint from '../../../../api/endpoints'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

export const Publish = ({userDetails}) => {
  console.log("userDetails L ", userDetails)
  const [isPublish, setIsPublish] = useState(false);
  const navigate = useNavigate();
  const [showPublish, setShowPublish] = useState(false);
  
  const [imageIdList, setImageIdList]= useState<string | any>([]);
  const [loading, setLoading] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);

  const {
    data: establishmentData,
    isLoading: isLoading,
    error: userDataError,
    refetch: refetchUserData,
  } = useQuery({
    queryKey: ["query-establishment-details"],
    queryFn: () => {
      return endpoint.getEstablishmentDetailsById(userDetails?.establishmentId);
    },
  });
  useEffect(()=>{
    console.log('in effect')
    setImageIdList(establishmentData?.data?.data?.estImages)
  }, [establishmentData])
  
  const fetchImage = async (image) => {
    try {
      setLoading(true);
      const response = await endpoint.getImages(image, establishmentData?.data?.data?.id);

      const imageUrl = URL.createObjectURL(response.data);
      return imageUrl
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect( () =>{
    const callFetchImageApi = async () =>{
      
      console.log("in  api")
      const urls = [];
      for (const imageId of imageIdList) {
        const imageUrl = await fetchImage(imageId);
        urls.push(imageUrl);
      }
      setImageUrls(urls);
      setLoading(false);
    }
    if (imageIdList?.length > 0) {
      callFetchImageApi();
    }
  }, [imageIdList])

  const publishEstablishment = async (payLoad) => {
    try {
      
      const response = await endpoint.publishEstablishment(payLoad); // Call the async function to get user details
      const res = response?.data; // Assuming response.data contains the user details

    } catch (error) {
      console.error('Error fetching user details:', error); // Handle any errors that occur
    }
  }

  function onClickPreview(){
    navigate(`/salon/${userDetails != null ? userDetails?.establishmentId : ""}`)
  }

  useEffect(()=>{
    const payLoad = {
      "id" : userDetails != null ? userDetails?.establishmentId : "",
      "isPublished": isPublish
    }
    publishEstablishment(payLoad);
  }, [isPublish])

  return (
    <div className='w-full'>
       {loading && <p>Loading...</p>}
        <div className='flex justify-center'>
            <img  src={imageUrls[0]} style={{ width: '300px', height: '200px', margin: '10px' }} />
        </div>

        <div className='text-5xl font-bold text-center p-4' style={{color: '#4D4D4D'}}>Lee Chow Salon’s online profile is created</div>
        <div className='text-xl font-normal text-center p-4' style={{color: '#4D4D4D'}}>You can publish now to make it available for everyone</div>

        <div className='flex justify-center'>
        <div className='flex justify-center flex-col w-36'>
            {showPublish && 
              <Buttons fullWidth variant="contained" sx={{borderRadius: '10px', padding: '10px 40px 10px 40px', marginBottom: '10px'}} name={'Publish'}  onClick={()=>{setIsPublish(true)}}></Buttons>
            }
            <Buttons  variant="outlined" sx={{borderRadius: '10px', padding: '10px 40px 10px 40px'}} name={'Preview'} onClick={()=>{onClickPreview()}}></Buttons>
        </div>
        </div>
        
        </div>
  )
}

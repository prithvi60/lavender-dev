import React, { useEffect, useState } from 'react'
import Buttons from '../../../../components/Button'
import { publish } from '../../../../api/constants'
import endpoint from '../../../../api/endpoints'

export const Publish = ({userDetails}) => {
  const [isPublish, setIsPublish] = useState(false)

  
  const publishEstablishment = async (payLoad) => {
    try {
      
      const response = await endpoint.publishEstablishment(payLoad); // Call the async function to get user details
      const userDetails = response?.data; // Assuming response.data contains the user details

    } catch (error) {
      console.error('Error fetching user details:', error); // Handle any errors that occur
    }
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
        <div className='flex justify-center'>
            <img style={{width:'400px', height: '220px', alignContent: 'center'}} src={'../../../../assets/SaloonImage/Saloon.png'}/>
        </div>
        <div className='text-5xl font-bold text-center p-4' style={{color: '#4D4D4D'}}>Lee Chow Salon’s online profile is created</div>
        <div className='text-xl font-normal text-center p-4' style={{color: '#4D4D4D'}}>You can publish now to make it available for everyone</div>

        <div className='flex justify-center'>
        <div className='flex justify-center flex-col w-36'>
            <Buttons fullWidth variant="contained" sx={{borderRadius: '10px', padding: '10px 40px 10px 40px', marginBottom: '10px'}} name={'Publish'}  onClick={()=>{setIsPublish(true)}}></Buttons>
            <Buttons  variant="outlined" sx={{borderRadius: '10px', padding: '10px 40px 10px 40px'}} name={'Preview'}></Buttons>
        </div>
        </div>
        
        </div>
  )
}

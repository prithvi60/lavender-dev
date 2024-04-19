import React from 'react'
import HeaderDetails from './HeaderDetails'
import ImageSlides from './ImageSlides'
import { SampleData } from './SampleData'
import ServiceDetails from './ServiceDetails'
import Availability from './Availability'
import About from './About'
import endpoint from '../../api/endpoints.ts';
import { useQuery } from '@tanstack/react-query';

function EstablishmentDetails() {
  const id=789
  const { data: establishmentData, isLoading: isLoading, error: userDataError, refetch: refetchUserData } = 
  useQuery({queryKey: ['custom'], queryFn: () =>{ return endpoint.getEstablishmentDetailsById(id)}})
  if(!isLoading){
    //console.log("establishmentData : ", establishmentData)
  }

  return (
    <div className='mt-16'>
        <HeaderDetails isLoading={isLoading} establishmentData={establishmentData}/>
        <ImageSlides />
        <div className='flex'>
          <ServiceDetails isLoading={isLoading} establishmentData={establishmentData}/>
          <Availability/>
        </div>
        <About/>
    </div>
  )
}

export default EstablishmentDetails
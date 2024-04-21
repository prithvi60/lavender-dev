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
  useQuery({queryKey: ['query-establishment-details'], queryFn: () =>{ return endpoint.getEstablishmentDetailsById(id)}})
  

  return (
    <div className='searchDetailsContainer'>
        <HeaderDetails isLoading={isLoading} establishmentData={establishmentData}/>
        <ImageSlides />
        <div className='mx-16 service-search-container'>
          <ServiceDetails isLoading={isLoading} establishmentData={establishmentData}/>
          <Availability />
        </div>
        <About establishmentData={establishmentData} id='SearchDetailAbout'/>
    </div>
  )
}

export default EstablishmentDetails
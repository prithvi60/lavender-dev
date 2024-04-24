import React from 'react'
import HeaderDetails from './HeaderDetails'
import ImageSlides from './ImageSlides'
import { SampleData } from './SampleData'
import ServiceDetails from './ServiceDetails'
import Availability from './Availability'
import About from './About'
import endpoint from '../../api/endpoints.ts';
import { useQuery } from '@tanstack/react-query';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './style.css';

// import required modules
import { Keyboard, Pagination, Navigation } from 'swiper/modules';
function EstablishmentDetails({estId}) {
  const id=789
  const { data: establishmentData, isLoading: isLoading, error: userDataError, refetch: refetchUserData } = 
  useQuery({queryKey: ['query-establishment-details'], queryFn: () =>{ return endpoint.getEstablishmentDetailsById(estId)}})

  return (
    <div className='searchDetailsContainer'>
        <HeaderDetails isLoading={isLoading} establishmentData={establishmentData}/>
        {/* <ImageSlides /> */}
        <Swiper
        className='w-4'
        slidesPerView={3}
        spaceBetween={30}
        keyboard={{
          enabled: true,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Keyboard, Pagination, Navigation]}
      >
                          {SampleData[0].image.map((image, index) => (
                                    
                                    <SwiperSlide>
                                      <img src={image} alt='no'className='w-full md:w-1/3 h-44 mb-4 md:mb-0 rounded-2xl'/>
                                    </SwiperSlide>

                              ))}
                          </Swiper>
                          
        <div className='mx-16 service-search-container'>
          <ServiceDetails isLoading={isLoading} establishmentData={establishmentData}/>
          <Availability />
        </div>
        <About establishmentData={establishmentData} id='SearchDetailAbout'/>
    </div>
  )
}

export default EstablishmentDetails
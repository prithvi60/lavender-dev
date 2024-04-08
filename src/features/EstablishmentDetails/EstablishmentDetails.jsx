import React from 'react'
import HeaderDetails from './HeaderDetails'
import ImageSlides from './ImageSlides'
import { SampleData } from './SampleData'
import ServiceDetails from './ServiceDetails'
import Availability from './Availability'
import About from './About'

function EstablishmentDetails() {
  return (
    <div className='mt-16'>
        <HeaderDetails />
        <ImageSlides />
        <div className='flex'>
          <ServiceDetails />
          <Availability/>
        </div>
        <About/>
    </div>
  )
}

export default EstablishmentDetails
import React from 'react'
import { SampleData } from './SampleData'

function ImageSlides() {
  return (
    <div className='flex items-center justify-center mx-16'>
      {
        SampleData[0].image.map((image)=> (
          <img src={image} className='w-full md:w-1/3 h-44 mb-4 md:mb-0 rounded-2xl'/>
        ))
      }

    </div>
  )
}

export default ImageSlides 
import React from 'react'
import { SampleData } from './SampleData'
import GetImage from '../../assets/GetImage'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';


function ImageSlides() {
  return (
    <div className='flex items-center justify-center mx-16'>
      {/* {
        SampleData[0].image.map((image)=> (
          <img src={image} className='w-full md:w-1/3 h-44 mb-4 md:mb-0 rounded-2xl'/>
        ))
      } */}
      
      <GetImage imageName='SaloonImage' className='w-full rounded-lg px-2'/>
      <GetImage imageName='SaloonImage' className='w-full rounded-lg px-2'/>
      <GetImage imageName='SaloonImage' className='w-full rounded-lg px-2'/>

    </div>
  )
}

export default ImageSlides 
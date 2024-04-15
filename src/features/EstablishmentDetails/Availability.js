import React from 'react'
import { SampleData } from './SampleData'
import Text from '../../components/Text'
import { Grid, Card, CardContent, Rating, CardActions, Collapse, Button, CardHeader } from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import emptyLogo from "../../assets/emptyImage.png"

function Availability() {
  return (
      <Card sx={{width : 350, borderRadius: 6}} className='my-20'>
        <CardContent>
          <div className='text-xl font-bold pb-2'>Availability</div>
          {
            SampleData[0].availability.map((item) => (
                <div className='flex justify-between' style={{padding: "1px"}}>
                  <div className='text-sm font-normal'>{item.day}</div>
                  {item.isOpen ? 
                    <div className='text-base font-medium'>{item.startTime}-{item.endTime}</div>
                  : <div className='text-base font-medium'>closed</div>}
                  
                </div>
            ))
        }
        <div className='text-xl font-bold pb-2'>Location</div>
        <div className='text-base font-medium'><LocationOnOutlinedIcon/>{SampleData[0].locationDetails}</div>
        <img src={emptyLogo} className='w-80 h-24 mb-4 md:mb-0 rounded-2xl'/>
        </CardContent>
      </Card>
        
  )
}

export default Availability
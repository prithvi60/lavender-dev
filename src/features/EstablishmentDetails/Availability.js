import React from 'react'
import { SampleData } from './SampleData'
import Text from '../../components/Text'
import { Grid, Card, CardContent, Rating, CardActions, Collapse, Button, CardHeader } from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import emptyLogo from "../../assets/emptyImage.png"
import GetIcon from '../../assets/Icon/icon';

function Availability(props) {
  const {isLoading, establishmentData} = props
console.log('establishmentData : ', establishmentData)
  return (
    <Card className='availability-card'>
      {!isLoading && 
      <CardContent>
      <div className='text-xl font-bold pb-2'>Availability</div>
      {
        establishmentData?.data?.availableTimes?.map((item) => (
            <div className='flex justify-between' style={{padding: "1px", color: '#808080'}}>
              <div className='text-sm font-normal'>{item.day}</div>
              <div className='text-base font-medium'>{item.openTime}am - {item.closeTime - 12}pm</div>
            </div>
        ))
    }
    <div className='text-xl font-bold pb-2'>Location</div>
    <div className='text-base font-medium' style={{color: '#4D4D4D', display: 'flex'}}><GetIcon iconName='LocationIcon'/> {establishmentData?.data?.establishmentLocation}</div>
    <div className='text-base font-medium' style={{color: '#4D4D4D', display: 'flex'}}><GetIcon iconName='CalendarIcon'/> Neighbourhood - Downtown</div>
    <img src={emptyLogo} className='w-80 h-24 mb-4 md:mb-0 rounded-2xl'/>
    </CardContent>
      }
      
    </Card>
  )
}

export default Availability
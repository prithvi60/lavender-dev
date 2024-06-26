import React from 'react'
import Text from '../../components/Text'
import { Grid, Card, CardContent, Rating, CardActions, Collapse, Button, CardHeader, Divider } from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import emptyLogo from "../../assets/emptyImage.png"
import GetIcon from '../../assets/Icon/icon';

function Availability(props) {
  const {isLoading, establishmentData, profile} = props
  return (
    <Card className='availability-card'>
      {!isLoading && 
      <CardContent>
      <div className='urbanist-font text-xl font-bold pb-2'>Availability</div>
      {
        establishmentData?.map((item) => (
            <div className={`flex justify-between ${false ? 'selected-availability' : ''}`} style={{padding: "1px", color: '#808080'}}>
              <div className='urbanist-font text-base'>{item.day}</div>
              {item.timeSlots?.map((time)=>(
                <div className='urbanist-font text-base'>{time.openTime}am - {time.closeTime}pm</div>
              ))}
            </div>
        ))
    }
    <div className='my-4'>
      <Divider style={{backgroundColor:'#A7A7A766'}}/>
    </div>
    <div className='urbanist-font text-xl font-bold pb-2'>Location</div>
    <div className='urbanist-font text-base font-medium mb-2 gap-2' style={{color: '#4D4D4D', display: 'flex'}}><GetIcon iconName='LocationIcon'/>{profile?.doorNo}, {profile?.cityCode}, {profile?.stateCode}</div>
    <div className='urbanist-font text-base font-medium mb-2 gap-2' style={{color: '#4D4D4D', display: 'flex'}}><GetIcon iconName='SalonHomeIcon'/> Neighbourhood - <span className='font-bold'>{profile?.locationTitle}</span></div>
    <img src={emptyLogo} alt='' className='w-full h-24 mb-4 md:mb-0 rounded-2xl'/>
    </CardContent>
      }
      
    </Card>
  )
}

export default Availability
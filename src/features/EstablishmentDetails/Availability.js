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
        establishmentData?.map((item,id) => (
            <div key={id} className={`flex justify-between ${false ? 'selected-availability' : ''}`} style={{padding: "1px", color: '#808080'}}>
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
    <div className='urbanist-font text-base font-medium mb-8 gap-2' style={{color: '#4D4D4D', display: 'flex'}}><GetIcon iconName='SalonHomeIcon'/> Neighbourhood - <span className='font-bold'>{profile?.locationTitle}</span></div>
    <Card className='w-full rounded-4xl' sx={{maxHeight: '200px !important'}}>
        <iframe 
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31081.53269316962!2d80.20855351621644!3d13.15031202030962!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5264db59c3d4b5%3A0x9be03109019f05f!2sMadhavaram%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1716260701299!5m2!1sen!2sin"
          width="100%"
          height="100%"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
    </Card>
    
    </CardContent>
      }
      
    </Card>
  )
}

export default Availability
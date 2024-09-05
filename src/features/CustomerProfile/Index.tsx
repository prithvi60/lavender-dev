import { Avatar, Box, Card, Grid, IconButton } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import endpoint from '../../api/endpoints'
import Button from '../../components/Button'
import PersonIcon from "@mui/icons-material/Person";
import UpComingBookings from './UpComingBookings'
import PastBookings from './PastBookings'
import Notifications from './Notifications'
import EditProfile from './EditProfile'
import { MyFavorites } from '../MyFavorites/MyFavorites'
import { useNavigate } from 'react-router-dom'
import { PaymentCard } from './PaymentCard'
import Text from '../../components/Text'
import GetIcon from '../../assets/Icon/icon'

function Index() {
  const navigate = useNavigate()
   const {isLoading, data: userInfo} = useQuery({queryKey: ["query-user-info"], queryFn: () => { return endpoint.getCustomerProfile()}})

  const handleFavouriteClick = () => {
    navigate('/favourites')
  }

  return (
    <div>
      {
        !isLoading && 
        <div className='mx-auto max-w-7xl px-6 pb-8'>
          <Box className='mt-24' sx={{'@media (max-width: 640px)': {marginTop: '150px !important'},}}>
            <Box sx={{display: 'flex', paddingBottom: 2}}>
              <IconButton onClick={()=> navigate(-1)}>
                <GetIcon iconName="BackIconArrow"/>
              </IconButton>
              <Text sx={styles.heading} name={'User Account'} align="left"></Text>
            </Box>
            
            <Card sx={{backgroundColor: '#FAF5FF', borderRadius: 6, border: '1px solid #CCCCCC', boxShadow: 'none'}}>
              <Grid container spacing={1} className='p-6 md:p-10 lg:p-16'>
                <Grid item lg={8} sx={{display: 'flex', gap: '30px', flexWrap: 'wrap'}}>
                  <Box sx={{'@media (max-width: 640px)': {},}}>
                    <Avatar sx={{ 
                      width: { xs: 160, sm: 239 }, 
                      height: { xs: 160, sm: 239 }, 
                      backgroundColor: '#1B1464' 
                    }} >
                      <PersonIcon sx={{
                        width: { xs: 80, sm: 110 }, 
                        height: { xs: 88, sm: 122 }
                      }}/>
                    </Avatar>
                  </Box>
                  <div style={{alignContent: 'center'}}>
                    <div>
                      <Text sx={styles.userName} name={userInfo?.data?.data?.appUser?.fullName} align='left' />
                      <Text sx={styles.email} name={userInfo?.data?.data?.appUser?.emailAddress} align='left'/>
                      <Text sx={styles.phone} name={`${userInfo?.data?.data?.appUser?.mobileCountryCode} ${userInfo?.data?.data?.appUser?.mobileNumber}`} align='left'/>
                      
                    </div>
                    <div className='pt-4'>
                    <EditProfile userInfo={userInfo?.data?.data}/>
                    </div>
                  </div>
                  
                </Grid>
                <Grid item className='grid gap-3' lg={4} sx={{placeSelf: 'center'}}>
                  <Button sx={{borderRadius: '10px', padding: '10px 40px 10px 40px', fontWeight:'600', fontSize: '20px'}}  className='w-fit' name={"My Favourites"} onClick={()=> {handleFavouriteClick()}}></Button>
                  <Button  sx={{borderRadius: '10px', padding: '10px 40px 10px 40px', fontWeight:'600', fontSize: '20px'}}  className='w-fit' variant={"outlined"} name={"Browse Treatments"}></Button>
                </Grid>
              </Grid>
            </Card>
          </Box>
          <UpComingBookings userInfo={userInfo?.data?.data}/>
          <PastBookings userInfo={userInfo?.data?.data}/>
          <PaymentCard userInfo={userInfo?.data?.data}/>
          <Notifications userInfo={userInfo?.data?.data}/>
        </div>
      }
    </div>
    
    
  )
}

export default Index

const styles = {
  heading: {
    color: '#4D4D4D',
    fontSize: '36px',
    fontWeight: 600
  },
  userName: {
    color: '#4D4D4D',
    fontSize: '36px',
    fontWeight: 600,
    lineHeight: '43px',
  },
  email: {
    color: '#4D4D4D',
    fontSize: '20px',
    fontWeight: 400,
    lineHeight: '24px',
    wordBreak: 'break-word',
    '@media (max-width: 640px)': {
      py:1
    }
  },
  phone: {
    color: '#4D4D4D',
    fontSize: '20px',
    fontWeight: 400,
    lineHeight: '24px'
  },
}
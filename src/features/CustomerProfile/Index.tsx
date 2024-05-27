import { Avatar, Card, Grid } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import endpoint from '../../api/endpoints'
import Button from '../../components/Button'
import PersonIcon from "@mui/icons-material/Person";
import UpComingBookings from './UpComingBookings'
import PastBookings from './PastBookings'
import Notifications from './Notifications'
import EditProfile from './EditProfile'

function Index() {
   const {isLoading, data: userInfo} = useQuery({queryKey: ["query-user-info"], queryFn: () => { return endpoint.getCustomerProfile()}})

//   fetch(`${BaseURL}${customerProfile}`, {
//     method: 'GET',
//     headers: {
//       "Content-Type": "application/json",
//       'authtoken': getBrowserCache("Token"),
//     }
//   })
// const [userInfo, setUserInfo] = useState({});
  
  return (
    <div className='mx-auto max-w-7xl px-5 pb-8'>
        <div className='mt-24'>
          <div className='text-3xl font-bold pb-4'>User Account</div>
          <Card sx={{backgroundColor: '#FAF5FF', borderRadius: 6, border: '1px solid #CCCCCC', boxShadow: 'none'}}>
            <Grid container spacing={1} className='p-6 md:p-10 lg:p-16'>
              <Grid item lg={8} sx={{display: 'flex', gap: '30px', flexWrap: 'wrap'}}>
                <div >
                  <Avatar sx={{ width: 239, height: 239 }} ><PersonIcon sx={{width: 110, height: 122}}/></Avatar>
                </div>
                <div style={{alignContent: 'center'}}>
                  <div>
                    <div className='text-4xl font-semibold'>{userInfo?.data?.appUser?.fullName}</div>
                    <div className='text-xl'>{userInfo?.data?.appUser?.emailAddress}</div>
                    <div className='text-xl'><span>{userInfo?.data?.appUser?.mobileCountryCode} </span>{userInfo?.data?.appUser?.mobileNumber}</div>
                  </div>
                  <div className='pt-4'>
                  <EditProfile />
                  </div>
                </div>
                
              </Grid>
              <Grid item className='grid gap-3' lg={4} sx={{placeSelf: 'center'}}>
                <Button className='w-fit' name={"My Favourites"}></Button>
                <Button className='w-fit' variant={"outlined"} name={"Browse Treatments"}></Button>
              </Grid>
            </Grid>
          </Card>
        </div>
        <UpComingBookings userInfo={userInfo?.data}/>
        <PastBookings userInfo={userInfo?.data}/>
        <Notifications userInfo={userInfo?.data}/>
    </div>
    
  )
}

export default Index
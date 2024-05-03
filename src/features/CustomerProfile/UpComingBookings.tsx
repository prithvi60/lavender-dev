import { Card, Grid } from '@mui/material'
import React from 'react'

function upComingBookings({userInfo}) {
  return (
    <div className='mx-24 mt-10'>
        <div className='text-3xl font-bold py-4'>Upcoming Bookings</div>
        {
            userInfo?.upcomingBookings?.map((bookings)=>(
            <Card sx={{width: 500, height: 150, borderRadius: 4}}>
                <Grid container spacing={1}>
                    <Grid item xs={4}>
                        <Card sx={{height: 150, borderRadius: 4, backgroundColor: '#EEEEFF', color: '#1B1464', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                            <div className="text-xl p-1">March 2024</div>
                            <div className='text-5xl font-bold p-1'>24</div>
                            <div className="text-xl p-1">Sunday</div>
                        </Card>
                    </Grid>
                    <Grid item xs={8} sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'start'}}>
                        <div className="text-xl p-1">{bookings?.establishmentName}</div>
                        <div className="text-3xl font-bold p-1">11 am</div>
                        <div className="text-xl p-1">{bookings.services.length} services</div>
                    </Grid>
                </Grid>
            </Card> 
            ))
        }
        
    </div>
  )
}

export default upComingBookings
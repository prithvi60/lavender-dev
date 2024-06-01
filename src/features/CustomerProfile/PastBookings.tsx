import { Card, Grid } from '@mui/material'
import React from 'react'
import moment from 'moment';
import EmptyBookings from './EmptyBookings';
import { NoPastBookings } from './Constant';

function PastBookings({userInfo}) {

    function convertToDateOnly(date){
        const dateObj = moment(date);
        return dateObj.date();
    }

    function convertToDayOnly(date){
        const dateObj = moment(date);
        return dateObj.format('dddd');
    }

    function convertToMonthOnly(date){
        const dateObj = moment(date);
        return dateObj.format('MMMM');;
    }

    function convertToYearOnly(date){
        const dateObj = moment(date);
        return dateObj.year();
    }

    function convertToTimeOnly(date){
        const dateObj = moment(date);
        return dateObj.format('h:mm A');
    }
  return (
    <div className='mt-10'>
        <div className='text-3xl font-bold py-4'>Past Bookings</div>
        {
            userInfo?.pastBookings.length > 0 ? (
            
            userInfo?.pastBookings?.map((bookings)=>(
                <div>
            <Card sx={{width: 500, height: 150, borderRadius: 4}}>
                <Grid container spacing={1}>
                    <Grid item xs={4}>
                        <Card sx={{height: 150, borderRadius: 4, backgroundColor: '#EEEEFF', color: '#1B1464', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                            <div className="text-xl p-1">{convertToMonthOnly(bookings?.startTime)} {convertToYearOnly(bookings?.startTime)}</div>
                            <div className='text-5xl font-bold p-1'>{convertToDateOnly(bookings?.startTime)}</div>
                            <div className="text-xl p-1">{convertToDayOnly(bookings?.startTime)}</div>
                        </Card>
                    </Grid>
                    <Grid item xs={8} sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'start'}}>
                        <div className="text-xl p-1">{bookings?.establishmentName}</div>
                        <div className="text-3xl font-bold p-1">{convertToTimeOnly(bookings?.startTime)}</div>
                        <div className="text-xl p-1">{bookings.services.length} services</div>
                    </Grid>
                </Grid>
            </Card> 
            <br></br>
            </div>
            ))
        ) :
        (
            <EmptyBookings noAppointmentsMessage={NoPastBookings}/>
        )
        }
        
    </div>
  )
}

export default PastBookings
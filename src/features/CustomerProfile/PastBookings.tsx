import { Card, Grid } from '@mui/material'
import React, { useState } from 'react'
import EmptyBookings from './EmptyBookings';
import { NoPastBookings } from './Constant';
import { BookingInfoModal } from './BookingInfoModal';
import { convertToDateOnly, convertToDayOnly, convertToMonthOnly, convertToTimeOnly, convertToYearOnly } from '../../utils/TimeFormat';

function PastBookings({userInfo}) {

    const [isModalOpen, setIsModalOpen] = useState(false);

    function handleCardClick () {
        setIsModalOpen((prev) => !prev);
    }

  return (
    <div className='mt-10'>
        <div className='text-3xl font-bold py-4'>Past Bookings</div>
        {
            userInfo?.pastBookings?.length > 0 ? (
            
            userInfo?.pastBookings?.map((bookings)=>(
                <div>
                    <Card sx={{width: 500, height: 150, borderRadius: 4, cursor: 'pointer'}} onClick={()=>{handleCardClick()}}>

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
            {isModalOpen && <BookingInfoModal isModalOpen={isModalOpen} bookings={bookings}/>}

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
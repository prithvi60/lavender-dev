import { Card, Grid } from '@mui/material'
import React, { useState } from 'react'
import EmptyBookings from './EmptyBookings';
import { NoUpComingBookings } from './Constant';
import { BookingInfoModal } from './BookingInfoModal';
import { convertToDateOnly, convertToDayOnly, convertToMonthOnly, convertToTimeOnly, convertToYearOnly } from '../../utils/TimeFormat';

function UpComingBookings({userInfo}) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    
    function handleCardClick () {
        setIsModalOpen((prev) => !prev);
    }

  return (
    <div className='mt-10'>
        <div className='text-3xl font-bold py-4'>Upcoming Bookings</div>
        {userInfo?.upcomingBookings?.length > 0 ? (
            userInfo?.upcomingBookings?.map((bookings)=>(
            <div>
                <Card sx={{width: 500, height: 150, borderRadius: 4}} onClick={()=>{handleCardClick()}}>
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
            // <div className="upcoming-details flex flex-wrap border border-[#CCCCCC] rounded-[20px]">
            //     <div className="text-[#1B1464] bg-[#EEEEFF] text-center gap-2 p-8 aspect-square grid rounded-[20px]">
            //     <span className='font-medium'>{convertToMonthOnly(bookings?.startTime)} {convertToYearOnly(bookings?.startTime)}</span>
            //     <h2 className='text-6xl font-semibold'>{convertToDateOnly(bookings?.startTime)}</h2>
            //     <span className='font-medium'>{convertToDayOnly(bookings?.startTime)}</span>
            //     </div>
            //     <div className="text-[#4D4D4D] gap-2 p-8 grid">
            //     <span className='font-medium'>{bookings?.establishmentName}</span>
            //     <h2 className='text-6xl font-semibold'>{convertToTimeOnly(bookings?.startTime)}</h2>
            //     <span className='font-medium'>{bookings.services.length} services</span>
            //     </div>
            // </div>
            ))
        ) : <EmptyBookings noAppointmentsMessage={NoUpComingBookings}/>}
        
    </div>
  )
}

export default UpComingBookings
import { Card, Grid, IconButton } from '@mui/material';
import React, { useRef, useState } from 'react';
import EmptyBookings from './EmptyBookings';
import { NoUpComingBookings } from './Constant';
import { BookingInfoModal } from './BookingInfoModal';
import { convertToDateOnly, convertToDayOnly, convertToMonthOnly, convertToTimeOnly, convertToYearOnly } from '../../utils/TimeFormat';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function UpComingBookings({ userInfo }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const scrollContainerRef = useRef(null);

    const handleCardClick = () => {
        setIsModalOpen(!isModalOpen);
    };

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollLeft -= 500; // Adjust scroll amount as per your card width
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollLeft += 500; // Adjust scroll amount as per your card width
        }
    };

    return (
        <div className='mt-10'>
            <div className='text-3xl font-bold py-4'>Upcoming Bookings</div>
            <div style={{ overflow: 'hidden', position: 'relative' }}>
                {userInfo?.upcomingBookings?.length > 0 ? (
                    <>
                        <div ref={scrollContainerRef} style={{ display: 'flex', flexDirection: 'row', transition: '0.5s', overflowX: 'auto' }}>
                            {userInfo?.upcomingBookings?.map((bookings, index) => (
                                <Card
                                    key={index}
                                    sx={{ minWidth: 500, maxWidth: 500, height: 150, borderRadius: 4, marginLeft: 2, marginRight: 2 }}
                                    onClick={handleCardClick}
                                >
                                    <Grid container spacing={1}>
                                        <Grid item xs={4}>
                                            <Card
                                                sx={{
                                                    height: 150,
                                                    borderRadius: 4,
                                                    backgroundColor: '#EEEEFF',
                                                    color: '#1B1464',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <div className='text-xl p-1'>
                                                    {convertToMonthOnly(bookings?.startTime)} {convertToYearOnly(bookings?.startTime)}
                                                </div>
                                                <div className='text-5xl font-bold p-1'>{convertToDateOnly(bookings?.startTime)}</div>
                                                <div className='text-xl p-1'>{convertToDayOnly(bookings?.startTime)}</div>
                                            </Card>
                                        </Grid>
                                        <Grid item xs={8} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'start' }}>
                                            <div className='text-xl p-1'>{bookings?.establishmentName}</div>
                                            <div className='text-3xl font-bold p-1'>{convertToTimeOnly(bookings?.startTime)}</div>
                                            <div className='text-xl p-1'>{bookings.services.length} services</div>
                                        </Grid>
                                    </Grid>
                                </Card>
                            ))}
                        </div>
                        <IconButton onClick={scrollLeft} style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', zIndex: 1 }}>
                            <ArrowBackIcon />
                        </IconButton>
                        <IconButton onClick={scrollRight} style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', zIndex: 1 }}>
                            <ArrowForwardIcon />
                        </IconButton>
                    </>
                ) : (
                    <EmptyBookings noAppointmentsMessage={NoUpComingBookings} />
                )}
                {isModalOpen && <BookingInfoModal isModalOpen={isModalOpen} bookings={userInfo?.upcomingBookings[0]} />}
            </div>
        </div>
    );
}

export default UpComingBookings;

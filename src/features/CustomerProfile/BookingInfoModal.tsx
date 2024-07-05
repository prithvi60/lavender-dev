import { Modal, Card, Grid, Divider } from '@mui/material';
import React, { useState } from 'react'
import { convertToDateOnly, convertToDayOnly, convertToMonthOnly, convertToTimeOnly, convertToYearOnly } from '../../utils/TimeFormat';
import GetIcon from '../../assets/Icon/icon';
import { CancelAppointmentModal } from './CancelAppointmentModal';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%', // Set the modal to 90% width of the viewport
    maxWidth: 900, // Maximum width for larger screens
    boxShadow: 24,
    borderRadius: 8,
    overflow: 'hidden' // Ensure contents do not overflow
};

export const BookingInfoModal = ({ isModalOpen, bookings, establishmentId }) => {

    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(isModalOpen);

    const handleClick = () => {
        setIsOpen((prev) => !prev);
    };

    function timeDifference(startTime, endTime){
        // Convert ISO strings to Date objects
        const startDate: any = new Date(startTime);
        const endDate: any = new Date(endTime);

        // Calculate the difference in milliseconds
        const differenceMs = endDate - startDate;

        // Convert milliseconds to minutes
        const differenceMinutes = Math.floor(differenceMs / (1000 * 60));
        return differenceMinutes;
    }

    function handleClickReschedule(){
        console.log("in reschedulw", bookings)
        navigate(`/salon/${establishmentId}#SearchDetailService`,  { replace: true })
    }

    return (
        <div>
            <Modal
                open={isOpen}
                onClose={handleClick}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                disableAutoFocus={true}
            >
                <Card sx={modalStyle}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={8} sx={{padding: '40px 24px 40px 40px !important'}}>
                            <div>
                                <Grid container spacing={1} sx={{ marginBottom: '20px' }}>
                                    <Grid item xs={12} sm={4}>
                                        <Card sx={{ height: '100%', width: '100%', padding: '', borderRadius: 4, backgroundColor: '#EEEEFF', color: '#1B1464', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                            <div className="text-xl p-1">{convertToMonthOnly(bookings?.startTime)} {convertToYearOnly(bookings?.startTime)}</div>
                                            <div className='text-5xl font-bold p-1'>{convertToDateOnly(bookings?.startTime)}</div>
                                            <div className="text-xl p-1">{convertToDayOnly(bookings?.startTime)}</div>
                                            <div className="text-2xl font-bold p-1">{convertToTimeOnly(bookings?.startTime)}</div>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={12} sm={8} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'start' }}>
                                        <div className="text-4xl font-semibold p-1" style={{ color: '#4D4D4D' }}>{bookings?.establishmentName}</div>
                                        <div className="text-2xl font-bold p-1" style={{ color: '#808080' }}>{bookings?.establishmentLocation}</div>
                                    </Grid>
                                </Grid>
                            </div>
                            <div>
                                <div>
                                    {
                                        bookings?.services?.map((service, index) => (
                                            <div key={index} className='flex justify-between items-center w-full py-2'>
                                                <div style={{ color: '#4D4D4D', fontSize: '20px', fontWeight: '600' }}>{service?.serviceName}</div>
                                                <div className='flex items-center'>
                                                    <div style={{ color: '#4D4D4D', fontSize: '20px', fontWeight: '600' }}>{timeDifference(service?.startTime, service?.endTime)} mins</div>
                                                    <div className="text-md text-center pl-2">{service?.bookingStatus}</div>
                                                    {
                                                        service?.bookingStatus !== 'CANCELED' && <CancelAppointmentModal bookings={service}/> 
                                                    }
                                                    
                                                </div>
                                            </div>
                                        ))
                                    }
                                    <Divider />
                                    <div>
                                        <div className='flex justify-between w-full py-4'>
                                            <div>
                                                <div style={{ color: '#4D4D4D', fontSize: '20px', fontWeight: '600' }}>Estimated time</div>
                                                <div>approx</div>
                                            </div>
                                            <div style={{ color: '#4D4D4D', fontSize: '20px', fontWeight: '600' }}>30 mins</div>
                                        </div>
                                        <div className='w-full pt-8'>
                                            <div style={{ color: '#4D4D4D', fontSize: '20px', fontWeight: '600' }}>Cancellation policy at this venue</div>
                                            <div>Cancel for free anytime in advance, otherwise you will be charged 100% of the service price for not showing up.</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={4} sx={{ backgroundColor: '#EEEEFF' }}>
                            <div style={{ height: '100%', width: '100%' }} className='flex flex-col justify-center items-center'>
                                <div className='flex items-center p-5'>
                                    <GetIcon iconName='LocationIcon' />
                                    <div className='pl-4'>Directions</div>
                                </div>
                                <div className='flex items-center p-5' onClick={()=>{handleClickReschedule()}}>
                                    <GetIcon iconName='CalendarIcon' />
                                    <div className='pl-4'>Reschedule</div>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </Card>
            </Modal>
        </div>
    )
}

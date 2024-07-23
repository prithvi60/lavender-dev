import { Card, Grid, IconButton, Modal } from '@mui/material';
import React, { useState } from 'react';
import GetIcon from '../../assets/Icon/icon';
import Button from '../../components/Button';
import GetImage from '../../assets/GetImage';
import CloseIcon from '@mui/icons-material/Close';
import endpoint from '../../api/endpoints';
import { bookingStatus } from '../../constants/appointments';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%', // Adjusted for responsiveness
    maxWidth: 700, // Maximum width for larger screens
    boxShadow: 24,
    borderRadius: 8,
    overflow: 'hidden', // Ensure contents do not overflow
};

export const CancelAppointmentModal = ({bookings}) => {
    const [isCancelOpen, setIsCancelOpen] = useState(false);

    function handleCancelClick() {
        setIsCancelOpen((prev) => !prev);
    }

    function handleCancelApptClick(serviceId) {
        
        const payload = {
            "id": bookings?.bookingId,
            "appointmentServices": [{
                serviceId: serviceId,
                bookingStatus: "CANCELED"
            }]
        }
        // const appointmentServices = bookings?.services?.map((item)=> ({
        //     serviceId: item.serviceId,
        //     bookingStatus: 
        // }))
        const res = endpoint.cancelAppointment(payload);
    }

    function handleRescheduleClick(){
    }

    return (
        <div>
            <div className='flex items-center justify-end p-5' style={{ cursor: 'pointer' }} onClick={handleCancelClick}>
                <GetIcon iconName='CancelIcon' />
                <div className='pl-1'>Cancel</div>
            </div>
            <Modal
                open={isCancelOpen}
                onClose={handleCancelClick}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                disableAutoFocus={true}
            >
                <Card sx={modalStyle}>
                    <div className='absolute top-4 right-4'>
                        <IconButton  onClick={() => handleCancelClick()}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                    <Grid container sx={{ padding: '20px' }} spacing={4}>
                        <Grid item xs={12} sm={4} sx={{ order: { xs: 1, sm: 2 }, padding: '4px' }}>
                            <GetImage imageName='IllustrateDog' />
                        </Grid>
                        <Grid item xs={12} sm={8} sx={{ order: { xs: 2, sm: 1 } }}>
                            <div>
                                <div className='text-4xl font-bold py-3' style={{ color: '#333333' }}>Are you sure you want to cancel your appointment?</div>
                                <div className='text-lg font-normal py-3' style={{ color: '#333333' }}>Should your plans change, we encourage you to explore rescheduling for a more suitable time.</div>
                            </div>
                            <div className='pt-12 pb-4 flex justify-start sm:justify-between'>
                                <div className='p-4'><Button variant='outlined' name={'Yes, Cancel'} onClick={()=>{handleCancelApptClick("SER00002514")}}/></div>
                                <div className='p-4'><Button name={'Reschedule'} onClick={()=> {handleRescheduleClick()}}/></div>
                            </div>
                        </Grid>
                    </Grid>
                </Card>
            </Modal>
        </div>
    );
};

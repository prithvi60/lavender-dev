import { Card, Grid, IconButton, Modal } from '@mui/material';
import React, { useState } from 'react';
import GetIcon from '../../assets/Icon/icon';
import Button from '../../components/Button';
import GetImage from '../../assets/GetImage';
import CloseIcon from '@mui/icons-material/Close';
import endpoint from '../../api/endpoints';
import { bookingStatus } from '../../constants/appointments';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from '../../components/Snackbar';

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
    const navigate = useNavigate();
    const showSnackbar = useSnackbar();
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

        try {
            mutation.mutate(payload);
        } catch (error) {
            console.error('Mutation failed:', error);
        }
    }
    
    const mutation = useMutation({
        mutationFn: async (payload: any) => {
            const response = await endpoint.cancelAppointment(payload);
            if(response?.data?.success){
                showSnackbar('Items saved successfully.', 'success');
                navigate(0)
              }
              else{
                showSnackbar(response?.data?.data, 'error');
            }
            return response;
        },
        onError: (error) => {
            alert('Edit unsuccessful: ' + error.message);
        },
    });

    function handleRescheduleClick(){
    }

    return (
        <div>
            <div className='flex items-center justify-end py-5 md:p-5' style={{ cursor: 'pointer' }} onClick={handleCancelClick}>
                <GetIcon iconName='CancelIcon' />
                <div className='pl-1 text-[#4D4D4D] text-base'>Cancel</div>
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
                                <div className='py-3 text-4xl font-bold' style={{ color: '#333333' }}>Are you sure you want to cancel your appointment?</div>
                                <div className='py-3 text-lg font-normal' style={{ color: '#333333' }}>Should your plans change, we encourage you to explore rescheduling for a more suitable time.</div>
                            </div>
                            <div className='flex justify-start pt-12 pb-4 sm:justify-between'>
                                <div className='p-4'><Button sx={styles.btn} variant='outlined' name={'Yes, Cancel'} onClick={()=>{handleCancelApptClick("SER00002514")}}/></div>
                                <div className='p-4'><Button sx={styles.btn} name={'Reschedule'} onClick={()=> {handleRescheduleClick()}}/></div>
                            </div>
                        </Grid>
                    </Grid>
                </Card>
            </Modal>
        </div>
    );
};

const styles = {
    btn: {
      color: '#FFFFFF',
      backgroundColor: '#825FFF',
      fontWeight: 600,
      fontSize: '16px',
      lineHeight: '24px',
      padding: '10px 40px 10px 40px',
      borderRadius: '10px',
      textTransform: 'none',
      whiteSpace: 'nowrap',
      '&:hover': {
        backgroundColor: '#5A3EBF',
      },
      '@media (max-width: 540px)': {
        padding: '10px 20px 10px 20px',
      }
    },
}
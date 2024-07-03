import { Card, Grid, Modal } from '@mui/material'
import React, { useState } from 'react'
import GetIcon from '../../assets/Icon/icon';
import Button from '../../components/Button';
import GetImage from '../../assets/GetImage';
import CloseIcon from '@mui/icons-material/Close';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    maxWidth: 700, // Maximum width for responsiveness
    boxShadow: 24,
    borderRadius: 8
};

export const CancelAppointmentModal = () => {
    const [isCancelOpen, setIsCancelOpen] = useState(false);
    function handleCancelClick(){
        setIsCancelOpen((prev) => !prev);
    }
  return (

    <div>
         <div className='flex p-5' style={{cursor: 'pointer'}} onClick={()=> handleCancelClick()}>
            <GetIcon iconName='CancelIcon'/>
            <div className='pl-4'>Cancel</div>
        </div>
        <Modal
            open={isCancelOpen}
            onClose={handleCancelClick}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            disableAutoFocus={true}
        >
                <Card  sx={modalStyle}>
                <div className=''>
                    <CloseIcon  onClick={handleCancelClick} />
                 </div>
                    <Grid container sx={{padding: '40px 30px'}}>
                        
                        <Grid xs={8}>
                            
                            <div>
                                <div className='text-4xl font-bold py-3' style={{color: '#333333'}}>Are you sure you want to cancel your appointment?</div>
                                <div className='text-lg font-normal py-3' style={{color: '#333333'}}>Should your plans change, we encourage you to explore rescheduling for a more suitable time</div>
                            </div>
                            <div className='pt-12 pb-4 flex'>
                                <div className='p-4'><Button variant='outlined' name={'Yes, Cancel'}/></div>
                                
                                <div className='p-4'><Button name={'Reschedule'}/></div>
                            </div>
                        </Grid>
                        <Grid xs={4} sx={{padding: '4px'}}>
                            
                            <GetImage imageName='IllustrateDog'/>
                        </Grid>
                    </Grid>
                </Card>
        </Modal>
    </div>
  )
}

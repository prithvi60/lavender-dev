import React, { useState } from 'react'
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import Modal from '@mui/material/Modal';
import { Add } from '@mui/icons-material';
import Buttons from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Divider from '@mui/material/Divider';

function OptionsModal({props}) {
     //const {props} = props
    console.log("props ; ", props.serviceDescription)
    const [isOpen, setIsOpen] = useState();

    const handleOpen = () => {
        setIsOpen((prev) => !prev);
      };

    const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    bgcolor: "background.paper",
    border: "2px",
    boxShadow: 24,
    p: 4,
    };
  return (
    <div>
    <Add onClick={handleOpen}/>
    <Modal
        open={isOpen}
        onClose={handleOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableScrollLock
        >
            <Box sx={style} className='rounded-3xl'>
            <IconButton
            aria-label="close"
            onClick={handleOpen}
            sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
            }}
            >
          <CloseIcon />
        </IconButton>
                <Grid container spacing={2} sx={{margin: "5px", padding: "15px"}}>
                    <Grid item xs={12} md={8}>
                        <div className='text-3xl font-bold'>{props.serviceName}</div>
                        <div className='text-2xl font-normal'>{props.serviceDuration}</div>
                        <div className='text-2xl font-bold'>{props.startingPrice}</div>
                    </Grid>
                    <Grid item xs={12} md={4} className='flex justify-center items-end'>
                        <Buttons variant="outlined" endIcon={<Add />} sx={{ width: '70%' }}>select</Buttons>
                    </Grid>
                    
                    <Grid item xs={12} className='py-8'>
                        <div className='text-2xl font-normal'>{props.serviceDescription}</div>
                    </Grid>
                </Grid>

                <Divider/>
                {
                    props.options.length > 0 && <Grid container spacing={2} sx={{margin: "5px", padding: "15px"}}>
                        <Grid item xs={12} >
                            <div className='text-2xl font-bold text-gray-500'>Choose options</div>
                        </Grid>
                        <Grid item xs={12}>
                            {
                                props.options.map((option) => (
                                    <Grid container spacing={1} className='py-4'>
                                        <div item xs={12} md={8}>
                                            <div className='text-lg font-bold'>{option.serviceName}</div>
                                            <div className='text-sm font-normal'>{option.duration}</div>
                                            <div className='text-base font-bold'>${option.finalPrice}</div>
                                        </div>
                                        <div item xs={12} md={4}>
                                            {/* <Add/> */}
                                        </div>
                                    </Grid>
                                    
                                ))
                            }
                        </Grid>
                    </Grid>
                }
            </Box>
        </Modal>
    </div>
    
  )
}

export default OptionsModal
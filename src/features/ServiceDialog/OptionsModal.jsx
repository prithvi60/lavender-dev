import React, { useState } from 'react'
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import Modal from '@mui/material/Modal';
import { Add } from '@mui/icons-material';
import Buttons from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Divider from '@mui/material/Divider';
import { updateCheckOut, resetCheckOut } from '../../store/slices/checkOutPageSlice';
import {
    useDispatch,
    useSelector,
  } from 'react-redux';
  import FormGroup from '@mui/material/FormGroup';
  import FormControlLabel from '@mui/material/FormControlLabel';
  import Checkbox from '@mui/material/Checkbox';

function OptionsModal({props}) {
    
    const checkOutList = useSelector(
        (state) => state.checkOutPage
      );
     //const {props} = props
    const [isOpen, setIsOpen] = useState();
    const [btnValue, setBtnValue] = useState("Select");
    const [btnVariant, setBtnVariant] = useState("outlined");
    const [checkBoxValue, setCheckBoxValue] = useState(false);
    
    const disPatch = useDispatch()

    const handleOpen = () => {
        setIsOpen((prev) => !prev);
      };
    
    function handleSelectBtnClick(serviceName, finalPrice, serviceDuration){
        let checkOutObj = {
            'serviceName': serviceName,
            'finalPrice': finalPrice,
            'serviceDuration': serviceDuration
        }
        if(btnValue == 'Select'){
            // addItemsToCheckOut(checkOutObj)
            disPatch(updateCheckOut(checkOutObj))
            setBtnValue("Deselect")
            setBtnVariant("contained")
        }
        else{
            // removeItemsToCheckOut(checkOutObj)
            disPatch(resetCheckOut(checkOutObj))
            console.log("chcheckOutList in options: ", checkOutList)

            setBtnValue("Select")
            setBtnVariant("outlined")
        }
    }

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
    }

  return (
    <div>
    <Add onClick={handleOpen}/>
        <Modal
            open={isOpen}
            onClose={handleOpen}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
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
                        <div className='text-2xl font-bold'>
                        {
                         props.options.length > 0 
                         ? 'from $'+props.startingPrice
                         : '$'+props.finalPrice
                        }
                        </div>
                    </Grid>
                    <Grid item xs={12} md={4} className='flex justify-center items-end'>
                        <Buttons variant={btnVariant} endIcon={<Add />} sx={{ width: '70%' }} onClick={() => handleSelectBtnClick(props.serviceName, props.finalPrice, props.serviceDuration)}>{btnValue}</Buttons>
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
                                    <Grid container spacing={1} className='py-4 flex justify-between'>
                                        <div item xs={12} md={8}>
                                            <div className='text-lg font-bold'>{option.serviceName}</div>
                                            <div className='text-sm font-normal'>{option.duration}</div>
                                            <div className='text-base font-bold'>${option.finalPrice}</div>
                                        </div>
                                        <div item xs={12} md={4} className='px-16 py-4'>
                                        <Checkbox
                                        inputProps={{ 'aria-label': 'controlled' }}
                                        onChange={() => handleSelectBtnClick(option.serviceName, option.finalPrice, option.duration)}
                                        />
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
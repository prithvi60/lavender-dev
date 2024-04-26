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
import CheckBox from '../../components/Checkbox';

function OptionsModal({props}) {
    
    const checkOutList = useSelector(
        (state: any) => state.checkOutPage
      );
console.log('checkOutList.checkOut.', checkOutList.checkOut)
     //const {props} = props
    const [isOpen, setIsOpen] = useState();
    const [btnValue, setBtnValue] = useState("Select");
    const [btnVariant, setBtnVariant] = useState<'contained' | 'outlined' | 'text' | string>("outlined");
    const [isChecked, setIsChecked] = useState(false);
    
    const disPatch = useDispatch()

    const handleOpen = () => {
        setIsOpen((prev):any => !prev);
      };
    
    function handleSelectBtnClick(serviceName, finalPrice, serviceDuration){
        debugger
        setIsChecked((prev) => !prev)
        let checkOutObj = {
            'serviceName': serviceName,
            'finalPrice': finalPrice,
            'serviceDuration': serviceDuration
        }
        console.log("checkOutObj : ", checkOutObj)
        if(btnValue == 'Select'){
            // addItemsToCheckOut(checkOutObj)
            disPatch(updateCheckOut(checkOutObj))
            setBtnValue("Deselect")
            setBtnVariant("contained")
        }
        else{
            // removeItemsToCheckOut(checkOutObj)
            disPatch(resetCheckOut(checkOutObj))

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
        sx={{maxWidth: 'lg', maxHeight: 'sm'}}
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
                        <div className='text-2xl font-normal'>{props.serviceDuration} mins</div>
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
                    props.options.length > 1 && <Grid container spacing={2} sx={{margin: "5px", padding: "15px"}}>
                        <Grid item xs={12} >
                            <div className='text-2xl font-bold text-gray-500'>Choose options</div>
                        </Grid>
                        <Grid item xs={12}>
                            {
                                props.options.map((option) => (
                                    <Grid container spacing={1} className='py-4 flex justify-between'>
                                        <div >
                                            <div className='text-lg font-bold'>{option.optionName}</div>
                                            <div className='text-sm font-normal'>{option.duration} mins</div>
                                            <div className='text-base font-bold'>${option.salePrice}</div>
                                        </div>
                                        <div className='px-16 py-4'>
                                        
                                        <input type='radio' onClick={() => handleSelectBtnClick(option.optionName, option.salePrice, option.duration)}></input>
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
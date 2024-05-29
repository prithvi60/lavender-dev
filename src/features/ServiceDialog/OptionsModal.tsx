import { useState } from 'react'
import Box from '@mui/material/Box';
import {  Grid } from '@mui/material';
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
import CheckBox from './CheckBox.tsx';
function OptionsModal({props}) {
    
    const checkOutList = useSelector(
        (state: any) => state.checkOutPage
      );
console.log('checkOutList.checkOut.', checkOutList.checkOut)
     //const {props} = props
    const [isOpen, setIsOpen] = useState();
    const [btnValue, setBtnValue] = useState("Select");
    const [btnVariant, setBtnVariant] = useState<"contained" | "outlined" | "text">("outlined");
    
    const disPatch = useDispatch()

    const handleOpen = () => {
        setIsOpen((prev):any => !prev);
      };
    
    function handleSelectBtnClick(serviceName, finalPrice, serviceDuration){
        
        // setIsChecked((prev) => !prev)
        let checkOutObj = {
            'serviceName': serviceName,
            'finalPrice': finalPrice,
            'serviceDuration': serviceDuration
        }
        console.log("checkOutObj : ", checkOutObj)
        if(btnValue === 'Select'){
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
        >
            <Box sx={style} className='rounded-3xl max-w-7xl urbanist-font'>
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
                <div className='flex flex-wrap p-6'>
                    <Grid className='w-full'>
                        <div className='text-2xl md:text-3xl font-bold'>{props.serviceName}</div>
                        <div className='flex justify-between items-end'>
                            <div>
                                <div className='text-xl md:text-2xl font-normal'>{props.serviceDuration} mins</div>
                                <div className='text-xl md:text-2xl font-bold'>
                                {
                                    props.options.length > 0 
                                    ? 'from $'+props.startingPrice
                                    : '$'+props.finalPrice
                                }
                                </div>
                            </div>
                            <Buttons variant={btnVariant} endIcon={<Add />} className='w-40 h-fit' onClick={() => handleSelectBtnClick(props.serviceName, props.finalPrice, props.serviceDuration)}>{btnValue}</Buttons>
                        </div>
                    </Grid>
                    
                    <Grid className='w-full my-4'>
                        <div className='text-xl md:text-2xl font-normal'>{props.serviceDescription}</div>
                    </Grid>
                </div>

                <div className="mx-6">
                    <Divider/>
                </div>
                {
                    props.options.length > 1 && <Grid container spacing={2} sx={{margin: "5px", padding: "15px"}}>
                        <Grid xs={12} >
                            <div className='text-2xl font-bold text-gray-500'>Choose options</div>
                        </Grid>
                        <Grid xs={12} className='service-options'>
                            {
                                props.options.map((option) => (
                                    <Grid className='py-4 flex justify-between'>
                                        <div >
                                            <div className='text-lg font-bold'>{option.optionName}</div>
                                            <div className='text-sm font-normal'>{option.duration} mins</div>
                                            <div className='text-base font-bold'>${option.salePrice}</div>
                                        </div>
                                        <div className='px-16 py-4'>
                                        
                                        <CheckBox  optionName ={option.optionName} salePrice ={option.salePrice} duration ={ option.duration} setBtnValue  = {setBtnValue} btnValue= {btnValue} setBtnVariant ={setBtnVariant}/>

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
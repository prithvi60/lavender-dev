import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import Modal from '@mui/material/Modal';
import { Add } from '@mui/icons-material';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Divider from '@mui/material/Divider';
import CheckBox from './CheckBox';
import { updateCheckOut, resetCheckOut } from '../../store/slices/checkOutPageSlice';
import { useDispatch } from 'react-redux';
import GetIcon from '../../assets/Icon/icon';

function OptionsModal({ props }) {
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [isSelectionValid, setIsSelectionValid] = useState(false); // To track if at least one option is selected
  const [isSelected, setSelected] = useState(false);

  useEffect(() => {
    // Check if selectedOptions has changed from initial state or is not empty
    if(isSelected){
        setSelected(true);
    }
  }, [isSelected, isSelectionValid]);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSelectAll = () => {
    if (!selectAll) {
      // Select all options
      const selected = props.options.map(option => option.optionId);
      setSelectedOptions(selected);
      setSelectAll(true);
      setSelected(true);

    } else {
      // Deselect all options
      setSelectedOptions([]);
      setSelectAll(false);
      setSelected(true);
    }
  };

  const handleOptionSelect = (optionId) => {
    let updatedSelection = [...selectedOptions];
    if (updatedSelection.includes(optionId)) {
      // Deselect option
      updatedSelection = updatedSelection.filter(id => id !== optionId);
    } else {
      // Select option
      updatedSelection.push(optionId);
    }
    setSelectedOptions(updatedSelection);
    setSelected(true);
  };

  const handleSaveSelection = () => {
    // Filter out deselected options
    const deselectedOptions = props.options
      .filter(option => !selectedOptions.includes(option.optionId))
      .map(option => option.optionId);
  
    // Update Redux store based on selectedOptions
    selectedOptions.forEach(optionId => {
      const selectedOption = props.options.find(option => option.optionId === optionId);
      if (selectedOption) {
        dispatch(updateCheckOut({
          serviceId: props.serviceId,
          optionId: selectedOption.optionId,
          serviceName: selectedOption.optionName,
          finalPrice: selectedOption.salePrice,
          serviceDuration: selectedOption.duration
        }));
      }
    });
  
    // Remove deselected options from Redux store
    deselectedOptions.forEach(optionId => {
      const deselectedOption = props.options.find(option => option.optionId === optionId);
      if (deselectedOption) {
        dispatch(resetCheckOut({
          serviceId: props.serviceId,
          optionId: deselectedOption.optionId
        }));
      }
    });
  
    setIsOpen(false);
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
      <IconButton onClick={() => handleOpen()}>
        <GetIcon iconName="PlusIcon"/>
      </IconButton>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className='rounded-3xl max-w-7xl urbanist-font'>
          <IconButton
            aria-label="close"
            onClick={handleClose}
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
                    {props.options.length > 0 ? `from $${props.startingPrice}` : `$${props.finalPrice}`}
                  </div>
                </div>
                <Button
                  variant={selectAll ? "contained" : "outlined"}
                  endIcon={<Add />}
                  className='w-40 h-fit'
                  onClick={handleSelectAll}
                  disabled={!props.options.length} // Disable if no options available
                >
                  {selectAll ? "Deselect All" : "Select All"}
                </Button>
              </div>
            </Grid>
            <Grid className='w-full my-4'>
              <div className='text-xl md:text-2xl font-normal'>{props.serviceDescription}</div>
            </Grid>
          </div>
          <div className="mx-6">
            <Divider />
          </div>
          {props.options.length > 0 &&
            <Grid container spacing={2} sx={{ margin: "5px", padding: "15px" }}>
              <Grid xs={12}>
                <div className='text-2xl font-bold text-gray-500'>Choose options</div>
              </Grid>
              <Grid xs={12} className='service-options'>
                {props.options.map((option) => (
                  <Grid className='py-4 flex justify-between' key={option.optionId}>
                    <div>
                      <div className='text-lg font-bold'>{option.optionName}</div>
                      <div className='text-sm font-normal'>{option.duration} mins</div>
                      <div className='text-base font-bold'>${option.salePrice}</div>
                    </div>
                    <div className='px-16 py-4'>
                      <CheckBox
                        optionId={option.optionId}
                        isSelected={selectedOptions.includes(option.optionId)}
                        onOptionSelect={() => handleOptionSelect(option.optionId)}
                      />
                    </div>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          }
          <div className="flex justify-end mt-4 mx-6">
            {isSelected && <Button variant="contained" onClick={handleSaveSelection}>Save Selection</Button>}
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default OptionsModal;

const styles={
  heading: {
    color: '#333333',
    fontSize: '36px',
    fontWeight: 600,
    paddingBottom: 2
  },
  rating: {
    color: '#4D4D4D',
    fontSize: '45px',
    fontWeight: 700,
    padding: 1
  },
}


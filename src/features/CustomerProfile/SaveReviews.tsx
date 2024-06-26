import React, { useState } from 'react';
import { Modal, Box, Grid, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import { useForm, Controller } from 'react-hook-form';
import { useSelector } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px',
  boxShadow: 24,
  p: 4,
  borderRadius: '15px',
};

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ff6d75',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
});

const sampleData = {
  "establishmentName": "Demo Salon",
  "OptedServices": [
    {
      "serviceName": "Hair Color",
      "employeeId": "EST005",
      "employeeName": "Sam"
    },
    {
      "serviceName": "Nail Color",
      "employeeId": "EST006",
      "employeeName": "Tom"
    },
    {
      "serviceName": "Face Color",
      "employeeId": "EST007",
      "employeeName": "Curran"
    }
  ]
};

const SaveReviews = () => {
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState(new Array(sampleData.OptedServices.length).fill(''));

  const { control, handleSubmit } = useForm();

  const userDetails = useSelector((state: any) => {
    return state?.currentUserDetails;
  });

  const fullName = userDetails?.fullName || "";

  const handleOpen = () => {
    setOpen(true);
    setCurrentStep(0);
    setReviews([]);
    setRating(0);
    setComments(new Array(sampleData.OptedServices.length).fill(''));
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const onSubmit = (data) => {
    const formData = {
      serviceName: sampleData.OptedServices[currentStep].serviceName,
      employeeId: sampleData.OptedServices[currentStep].employeeId,
      rating: rating.toString(),
      comments: comments[currentStep].trim() !== '' ? comments[currentStep] : undefined // Only add comments if not empty
    };

    setReviews([...reviews, formData]);
    setRating(0);

    if (currentStep < sampleData.OptedServices.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // If it's the last step, don't proceed to next step automatically
    }
  };

  const handleFinalSubmit = () => {
    // Add the last review object before displaying the final alert
    const lastReview = {
      serviceName: sampleData.OptedServices[currentStep].serviceName,
      employeeId: sampleData.OptedServices[currentStep].employeeId,
      rating: rating.toString(),
      comments: comments[currentStep].trim() !== '' ? comments[currentStep] : undefined // Only add comments if not empty
    };

    const finalReviews = [...reviews, lastReview].filter(review => review.rating !== '0'); // Filter out reviews with rating 0

    // Display final data in alert
    window.alert(JSON.stringify(finalReviews, null, 2));

    // Reset state after submission (optional)
    setReviews([]);
    setRating(0);
    setComments(new Array(sampleData.OptedServices.length).fill(''));
    setOpen(false);
  };

  return (
    <div>
      <Button className='w-full' onClick={handleOpen} sx={{ display: 'flex', justifyContent: 'center' }} variant="contained">
        Add reviews
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        
        <Box sx={style} className="filter-box">
          <Grid container spacing={2} className='filters-container'>
            <Grid item xs={12}>
              <div className="font-semibold text-xl mb-3" style={{ color: '#616161', textAlign: 'center' }}>
                Hey {fullName}
              </div>

              <div className="font-bold text-2xl mb-3" style={{ color: '#616161', textAlign: 'center' }}>
              Would you like to review your experience ?
              </div>

              <div className="font-semibold text-xl mb-3" style={{ color: '#616161', textAlign: 'start' }}>
                {sampleData.establishmentName}
              </div>
              {currentStep < sampleData.OptedServices.length && (
                <>
                  {/* <div className="font-semibold text-xl mb-3" style={{ color: '#616161', textAlign: 'center' }}>
                    {sampleData.OptedServices[currentStep].serviceName}
                  </div> */}

                  <div className="font-semibold text-l mb-3" style={{ color: '#616161', textAlign: 'start' }}>
                  {sampleData.OptedServices[currentStep].serviceName} serviced by {sampleData.OptedServices[currentStep].employeeName}
                  </div>
                  
                  <div style={{ color: '#616161', textAlign: 'center' }}>
                    <StyledRating
                      name="rating"
                      value={rating}
                      precision={1}
                      onChange={(event, value) => handleRatingChange(value)}
                    />
                  </div>
                  

                  <Controller
                    name={`comments-${currentStep}`} // Use dynamic name for comments field
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id={`comments-${currentStep}`}
                        multiline
                        rows={5}
                        variant="outlined"
                        sx={{ width: '100%', marginBottom: '20px' }}
                        placeholder="Enter your comments..."
                        value={comments[currentStep]}
                        onChange={(e) => {
                          const newComments = [...comments];
                          newComments[currentStep] = e.target.value;
                          setComments(newComments);
                        }}
                      />
                    )}
                  />

                  {currentStep === sampleData.OptedServices.length - 1 ? (
                    <div style={{textAlign: 'center'}}><Button onClick={handleFinalSubmit} variant="contained">Submit</Button></div>
                  ) : (
                    <div style={{textAlign: 'end'}}><Button onClick={handleSubmit(onSubmit)} variant="contained">Next</Button></div>
                  )}
                </>
              )}
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default SaveReviews;

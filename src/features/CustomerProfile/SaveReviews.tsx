import React, { useEffect, useState } from 'react';
import { Modal, Box, Grid, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import { Controller, useForm } from 'react-hook-form';
import endpoint from '../../api/endpoints';
import { useSelector } from 'react-redux';

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

const CenteredBox = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column'
});

const SaveReviews = () => {
  const [open, setOpen] = useState(false);
  const [estName, setEstName] = useState('');
  const [rating, setRating] = useState(0); // State to manage selected rating
  const [submittedData, setSubmittedData] = useState(null); // State to store submitted form data
  const userDetails = useSelector((state: any) => state?.currentUserDetails);
  const fullName = userDetails?.fullName || '';
  const establishmentId = userDetails?.establishmentId || '';

  const { control, handleSubmit, reset } = useForm();

  useEffect(() => {
    const getEstablishmentDetails = async () => {
      try {
        const establishmentData = await endpoint.getEstablishmentDetailsById(establishmentId);
        if (establishmentData?.data?.success) {
          setEstName(establishmentData?.data?.data?.profile?.establishmentName || '');
        }
      } catch (error) {
        console.error('Error fetching establishment details:', error);
      }
    };

    getEstablishmentDetails();
  }, [establishmentId]);

  const onSubmit = async (data) => {
    // Include rating in the form data
    const formData = {
      ...data,
      rating: rating.toString(), // Convert rating to string if needed
    };
     alert(JSON.stringify(formData, null, 2));
     const payload = {
      "id" : establishmentId,
      "review": {
      "cleanlinessRating": 0,
      "ambienceRating": 0,
      "serviceQualityRating": 0,
      "overallRating": data.rating,
      "reviewDate": new Date(),
      "publicComments": data.comments,
      "privateComments": "string"
  },
     }
    try {
      // You can process the form data here, e.g., send it to the backend
      // Mock submission delay for demonstration
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmittedData(formData);
      reset(); // Reset form fields
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleRatingChange = (value) => {
    setRating(value); // Update the selected rating in state
  };

  return (
    <div>
      <Button disabled={false} className='w-full' onClick={handleOpen} sx={{ display: 'flex', justifyContent: 'center' }} variant="contained">
        Add reviews
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="filter-box">
          <CenteredBox>
            {submittedData ? (
            <div>
              <div className="font-bold text-3xl mb-3" style={{ color: '#616161', textAlign: 'center' }}>
                Amazing!
              </div>
              <div className="font-semibold text-xl mb-3" style={{ color: '#616161', textAlign: 'center' }}>
              Thank you for your review.
              </div>
            </div>
            ) : (
              <>
                <div className="font-bold text-2xl mb-3" style={{ color: '#616161', textAlign: 'center' }}>
                  Hey {fullName}
                </div>

                <div className="font-bold text-3xl mb-3" style={{ color: '#616161', textAlign: 'center' }}>
                  Would you like to review your experience ?
                </div>

                <StyledRating
                  name="rating"
                  value={rating} // Bind the value to the state
                  precision={1}
                  onChange={(event, value) => handleRatingChange(value)}
                />

                <div className="font-semibold text-xl mb-3" style={{ color: '#616161', textAlign: 'center' }}>
                  {estName}
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <Controller
                    name="comments"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-multiline-static"
                        multiline
                        rows={5}
                        variant="outlined"
                        sx={{ width: '400px', marginBottom: '20px' }}
                      />
                    )}
                  />
                  <Button type="submit" variant="contained">Submit</Button>
                </form>
              </>
            )}
          </CenteredBox>
          <Grid container spacing={2} className='filters-container'>
            <Grid item xs={12}>

            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default SaveReviews;

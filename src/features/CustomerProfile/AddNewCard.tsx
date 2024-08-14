import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Modal, Card, Grid, Typography, TextField, Checkbox, FormControlLabel, useMediaQuery, useTheme } from '@mui/material';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import CloseIcon from '@mui/icons-material/Close';
import endpoint from '../../api/endpoints';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from '../../components/Snackbar';

const schema = yup.object().shape({
    cardNumber: yup.string().required('Card number is required').matches(/^\d{16}$/, 'Must be exactly 16 digits'),
    cardOwner: yup.string().required('Card owner is required'),
    expiryMonth: yup.string().required('Expiry month is required').matches(/^\d{1,2}$/, 'Invalid month'),
    expiryYear: yup.string().required('Expiry year is required').matches(/^\d{2}$/, 'Invalid year'),
    cvv: yup.string().required('CVV is required').matches(/^\d{3}$/, 'Must be exactly 3 digits'),
});

const typographyStyle = {
    fontFamily: 'Urbanist',
    fontWeight: 600,
    fontSize: '16px',
    color: '#4D4D4D'
};

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%', // Adjust width as needed
    maxWidth: 700, // Maximum width for responsiveness
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 8,
    p: 4,
};

export const AddNewCard = () => {
    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
    });
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const showSnackbar = useSnackbar();
    const theme = useTheme();

    const handleClick = () => {
        setIsOpen((prev) => !prev);
    };

    const onSubmit = (data) => {
        const newData = {
            ...data,
            makeDefault: !!data.makeDefault
        };
        const payLoad = {
            "cardName": data.cardOwner,
            "cardNum": data.cardNumber,
            "expiry": `${data.expiryMonth}${data.expiryYear}`,
            "cvv": data.cvv,
            "default": false
        }

        try {
            mutation.mutate(payLoad);
        } catch (error) {
            console.error('Mutation failed:', error);
        }
        handleClick();
    };

    const mutation = useMutation({
        mutationFn: async (payload: any) => {
            const response = await endpoint.saveCardInfo(payload);
            if (response?.data?.success) {
                showSnackbar('Items saved successfully.', 'success');
                navigate(0);
            } else {
                showSnackbar(response?.data?.data, 'error');
            }
            return response;
        },
        onError: (error) => {
            alert('Edit unsuccessful: ' + error.message);
        },
    });

    // Hook to determine if the screen size is mobile or tablet
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

    return (
        <>
            <Card 
                sx={{
                    backgroundImage: 'url(/cardbg.png)', 
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundColor: '#C9C5FF', 
                    width: '100%', 
                    height: '100%', 
                    cursor: 'pointer', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    justifyContent: 'center',  
                    overflow: 'hidden',
                    textAlign: 'center'
                }} 
                onClick={handleClick}
            >
                <div style={{ color: '#FFFFFF', fontSize: isMobile ? '24px' : '32px', fontWeight: '700' }}>
                    <div>Add New Card</div>
                    <div>{"[+]"}</div>
                </div>
            </Card>

            <Modal
                open={isOpen}
                onClose={handleClick}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                disableAutoFocus={true}
            >
                <Card sx={modalStyle}>
                    <div className='absolute top-4 right-4 cursor-pointer'>
                        <CloseIcon onClick={handleClick} />
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography 
                                    variant="h4" 
                                    align="center" 
                                    sx={{ 
                                        fontFamily: 'Urbanist', 
                                        fontSize: isTablet ? '24px' : '28px', 
                                        fontWeight: '600', 
                                        color: '#616161', 
                                        marginBottom: '8px' 
                                    }}
                                >
                                    Add new card
                                </Typography>
                            </Grid>
                            
                            <Grid container item xs={12} spacing={2}>
                                <Grid item xs={12} md={4}>
                                    <Typography sx={typographyStyle}>Card number</Typography>
                                    <Typography sx={{fontSize: '12px'}}>Enter the 16-digit card no. on the card</Typography>
                                </Grid>
                                <Grid item xs={12} md={8}>
                                    <Controller
                                        name="cardNumber"
                                        control={control}
                                        defaultValue=""
                                        render={({ field }) => (
                                            <TextField
                                                fullWidth
                                                {...field}
                                                variant="outlined"
                                                error={!!errors.cardNumber}
                                                helperText={errors.cardNumber?.message}
                                                inputProps={{ maxLength: 16 }} // Allow up to 16 digits input
                                            />
                                        )}
                                    />
                                </Grid>
                            </Grid>

                            <Grid container item xs={12} spacing={2}>
                                <Grid item xs={12} md={4}>
                                    <Typography sx={typographyStyle}>Card owner</Typography>
                                    <Typography sx={{fontSize: '12px'}}>Enter the name on the card</Typography>
                                </Grid>
                                <Grid item xs={12} md={8}>
                                    <Controller
                                        name="cardOwner"
                                        control={control}
                                        defaultValue=""
                                        render={({ field }) => (
                                            <TextField
                                                fullWidth
                                                {...field}
                                                variant="outlined"
                                                error={!!errors.cardOwner}
                                                helperText={errors.cardOwner?.message}
                                            />
                                        )}
                                    />
                                </Grid>
                            </Grid>

                            <Grid container item xs={12} spacing={2}>
                                <Grid item xs={12} md={4}>
                                    <Typography sx={typographyStyle}>Expiry date</Typography>
                                    <Typography sx={{fontSize: '12px'}}>Enter the expiration date</Typography>
                                </Grid>
                                <Grid item xs={12} md={4} container spacing={2}>
                                    <Grid item xs={6}>
                                        <div className='flex'>
                                            <Controller
                                                name="expiryMonth"
                                                control={control}
                                                defaultValue=""
                                                render={({ field }) => (
                                                    <TextField
                                                        sx={{minWidth: '80px'}}
                                                        {...field}
                                                        variant="outlined"
                                                        error={!!errors.expiryMonth}
                                                        helperText={errors.expiryMonth?.message}
                                                        inputProps={{ maxLength: 2 }} // Allow up to 2 digits input
                                                    />
                                                )}
                                            />
                                            <span className='text-6xl'>/</span>
                                        </div>
                                    </Grid>
                                    
                                    <Grid item xs={6}>
                                        <Controller
                                            name="expiryYear"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => (
                                                <TextField
                                                    sx={{width: '80px'}}
                                                    {...field}
                                                    variant="outlined"
                                                    error={!!errors.expiryYear}
                                                    helperText={errors.expiryYear?.message}
                                                    inputProps={{ maxLength: 2 }} // Allow up to 2 digits input
                                                />
                                            )}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid item xs={12} md={4} container spacing={1} sx={{display: 'flex', justifyContent: 'end'}}>
                                    <Grid item xs={4}>
                                        <Typography sx={typographyStyle}>CVV</Typography>
                                        <Typography sx={{fontSize: '12px'}}>Security code</Typography>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Controller
                                            name="cvv"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => (
                                                <TextField
                                                    sx={{width: '100px'}}
                                                    {...field}
                                                    variant="outlined"
                                                    error={!!errors.cvv}
                                                    helperText={errors.cvv?.message}
                                                    inputProps={{ maxLength: 3 }} // Allow up to 3 digits input
                                                />
                                            )}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid container item xs={12} spacing={2}>
                                <Grid item xs={12} md={8} />

                                <Grid item xs={12} md={4} sx={{display: 'flex', justifyContent: 'end'}}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                name="makeDefault"
                                                color="primary"
                                            />
                                        }
                                        label="Make default"
                                    />
                                </Grid>
                            </Grid>

                            <Grid item xs={12}>
                                <Button sx={styles.btn} type="submit" variant="contained" color="primary" fullWidth>Save this card</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Card>
            </Modal>
        </>
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
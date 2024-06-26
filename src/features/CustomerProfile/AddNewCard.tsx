import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Modal, Card, Grid, Typography, TextField } from '@mui/material';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

const schema = yup.object().shape({
    cardNumber: yup.string().required('Card number is required').matches(/^\d{16}$/, 'Must be 16 digits'),
    cardOwner: yup.string().required('Card owner is required'),
    expiryMonth: yup.string().required('Expiry month is required').matches(/^(0[1-9]|1[0-2])$/, 'Invalid month'),
    expiryYear: yup.string().required('Expiry year is required').matches(/^\d{2}$/, 'Invalid year'),
    cvv: yup.string().required('CVV is required').matches(/^\d{3}$/, 'Must be 3 digits'),
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
    width: '100%', // Adjust width as needed
    maxWidth: 500, // Maximum width for responsiveness
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

    const handleClick = () => {
        setIsOpen((prev) => !prev);
    };

    const onSubmit = (data) => {
        alert(JSON.stringify(data, null, 2)); // Show form data in alert for demo purposes
    };

    return (
        <>
            <Card sx={{backgroundColor: '#C9C5FF', width: '100%', height: '100%', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',  overflow: 'hidden'}} 
                onClick={handleClick}
            >
                <div style={{ color: '#FFFFFF', fontSize: '32px', fontWeight: '700', textAlign: "center",   alignContent: 'center'}}>
                    <div>Add New Card</div>
                    <div>{"[+]"}</div>
                </div>
            </Card>

            <Modal
                open={isOpen}
                onClose={handleClick}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Card sx={modalStyle}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="h4" align="center" sx={{ fontFamily: 'Urbanist', fontSize: '28px', fontWeight: '600', color: '#616161', marginBottom: '8px' }}>Add new card</Typography>
                            </Grid>
                            
                            <Grid container item xs={12} spacing={2}>
                                <Grid item xs={4}>
                                    <Typography sx={typographyStyle}>Card number</Typography>
                                    <Typography>Enter the 16-digit card no. on the card</Typography>
                                </Grid>
                                <Grid item xs={8}>
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
                                            />
                                        )}
                                    />
                                </Grid>
                            </Grid>

                            <Grid container item xs={12} spacing={2}>
                                <Grid item xs={4}>
                                    <Typography sx={typographyStyle}>Card owner</Typography>
                                    <Typography>Enter the name on the card</Typography>
                                </Grid>
                                <Grid item xs={8}>
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
                                <Grid item xs={4}>
                                    <Typography sx={typographyStyle}>Expiry date</Typography>
                                    <Typography>Enter the expiration date</Typography>
                                </Grid>
                                <Grid item xs={8} container spacing={2}>
                                    <Grid item xs={6}>
                                        <Controller
                                            name="expiryMonth"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => (
                                                <TextField
                                                    fullWidth
                                                    {...field}
                                                    variant="outlined"
                                                    error={!!errors.expiryMonth}
                                                    helperText={errors.expiryMonth?.message}
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Controller
                                            name="expiryYear"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => (
                                                <TextField
                                                    fullWidth
                                                    {...field}
                                                    variant="outlined"
                                                    error={!!errors.expiryYear}
                                                    helperText={errors.expiryYear?.message}
                                                />
                                            )}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid container item xs={12} spacing={2}>
                                <Grid item xs={4}>
                                    <Typography sx={typographyStyle}>CVV</Typography>
                                    <Typography>Enter the 3-digit CVV number</Typography>
                                </Grid>
                                <Grid item xs={8}>
                                    <Controller
                                        name="cvv"
                                        control={control}
                                        defaultValue=""
                                        render={({ field }) => (
                                            <TextField
                                                fullWidth
                                                {...field}
                                                variant="outlined"
                                                error={!!errors.cvv}
                                                helperText={errors.cvv?.message}
                                            />
                                        )}
                                    />
                                </Grid>
                            </Grid>

                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" color="primary">Save this card</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Card>
            </Modal>
        </>
    );
};

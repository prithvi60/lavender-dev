import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField, Checkbox, Button, FormControlLabel, MenuItem, Select, InputLabel, FormControl, FormHelperText, Box, Grid, Snackbar, IconButton } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';
import endpoint from '../../api/endpoints';
import { useMutation } from '@tanstack/react-query';
import Text from '../Text';
import { useNavigate } from 'react-router-dom';
import GetIcon from '../../assets/Icon/icon';

const schema = yup.object().shape({
    fullName: yup.string().required('Full name is required'),
    areaCode: yup.string().required('Area code is required'),
    mobileNumber: yup.string().required('Mobile number is required').matches(/^[0-9]{10}$/, 'Must be exactly 10 digits'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
    userType: yup.string().required('User type is required'),
    dateOfBirth: yup.date().nullable(),
    accept: yup.boolean(),
});

const RegisterScreen = () => {
    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
    });
    const [value, setValue] = React.useState<Dayjs | null>(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: async (payload: any) => {
          const response =  await endpoint.userRegister(payload);
          if(!response?.data?.success){
            debugger
            setSnackbarMessage(`ErrorCode : ${response.data.errorCode} ${response?.data?.data}`);
            setSnackbarOpen(true);
          }
          else{
            debugger
            setSnackbarMessage("user created successfully.");
            setSnackbarOpen(true);
            navigate('/');
          }
          return response;
        },
        onSuccess: (response: any) => {
          setTimeout(() => {
            
          },1000)
        },
        onError: (response: any) => {
          alert('Register unsuccess')
        },
        onSettled: () => {}
    });

    const onSubmit = (data) => {
        const payLoad = {
            "userType":data.userType,
            "fullName": data.fullName,
            "emailAddress": data.email,
            "password": data.password,
            "mobileCountryCode": data.areaCode,
            "mobileNumber": data.mobileNumber,
            "dob": data.dateOfBirth
          }
        mutation.mutate(payLoad)
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };
    return (
        <div>

            <Grid>
                <Text variant="h4" align="center" name="Register or Login" />
            </Grid>
            <Box  sx={{ mt: 3 }}>
                <Grid container spacing={2} sx={{display: 'flex', justifyContent: 'center'}}>
                    <form onSubmit={handleSubmit((data)=>{
                        onSubmit(data);
                    })}>
                    <Grid item xs={12}>
                        <Controller
                                name="fullName"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <TextField
                                    fullWidth
                                        {...field}
                                        label="Full Name"
                                        variant="standard"
                                        error={!!errors.fullName}
                                        helperText={errors.fullName?.message}
                                    />
                                )}
                            />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                                name="email"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <TextField
                                    fullWidth
                                        {...field}
                                        label="Email"
                                        variant="standard"
                                        error={!!errors.email}
                                        helperText={errors.email?.message}
                                    />
                                )}
                            />
                    </Grid>
                    
                    <Grid item xs={12}>
                    <Controller
                            name="userType"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <FormControl error={!!errors.userType} fullWidth>
                                    <InputLabel>User Type</InputLabel>
                                    <Select
                                    fullWidth
                                        {...field}
                                        label="User Type"
                                        error={!!errors.userType}
                                        variant="standard"
                                        
                                    >
                                        <MenuItem value="OC">Customer</MenuItem>
                                        <MenuItem value="BU">Business</MenuItem>
                                    </Select>
                                    <FormHelperText>{errors.userType?.message}</FormHelperText>
                                </FormControl>
                            )}
                        />
                    </Grid>

                    <Grid sx={{display: 'flex', padding: '10px' }} xs={12}>
                        <Grid  sx={{paddingRight: '5px'}} xs={4} >
                            <Controller
                                    name="areaCode"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <TextField
                                        fullWidth
                                            {...field}
                                            label="Area Code"
                                            variant="standard"
                                            error={!!errors.areaCode}
                                            helperText={errors.areaCode?.message}
                                        />
                                    )}
                                />
                        </Grid>
                            
                        <Grid  xs={8}>
                            <Controller
                                    name="mobileNumber"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <TextField
                                        fullWidth
                                            {...field}
                                            label="Mobile Number"
                                            variant="standard"
                                            error={!!errors.mobileNumber}
                                            helperText={errors.mobileNumber?.message}
                                        />
                                    )}
                                />
                        </Grid>
                    </Grid>
                    
                    <Grid item xs={12}>
                        <Controller
                                name="dateOfBirth"
                                control={control}
                                defaultValue= {new Date()}
                                render={({ field }) => (
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker {...field} value={value} sx={{width: '100%'}} slotProps={{ textField: { variant: 'standard', } }}/>
                                    </LocalizationProvider>
                                )}
                            />
                    </Grid>
                        
                    <Grid item xs={12}>
                        <Controller
                                name="password"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <TextField
                                    fullWidth
                                        {...field}
                                        label="Password"
                                        type="password"
                                        variant="standard"
                                        error={!!errors.password}
                                        helperText={errors.password?.message}
                                    />
                                )}
                            />
                    </Grid>

                    <Grid item xs={12}>
                    <FormControlLabel
                            control={
                                <Controller
                                    name="accept"
                                    control={control}
                                    defaultValue={false}
                                    render={({ field }) => (
                                        <Checkbox
                                            {...field}
                                            color="primary"
                                            inputProps={{ 'aria-label': 'Accept terms and conditions' }}
                                        />
                                    )}
                                />
                            }
                            label="I Agree to terms and condition, privacy policy and terms of use"
                            error={!!errors.accept}
                        />
                        <FormHelperText error={!!errors.accept}>{errors.accept?.message}</FormHelperText>

                    </Grid>

                        
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary">
                            Create an account
                        </Button>
                    </Grid>
                        
                    </form>
                    <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    
                    open={snackbarOpen}
                    autoHideDuration={6000}
                    onClose={handleCloseSnackbar}
                    message={snackbarMessage}
                    action={
                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseSnackbar}>
                            <GetIcon iconName="CloseIcon" />
                        </IconButton>
                    }
                />
                </Grid>
                
            </Box>
        </div>


    );
};

export default RegisterScreen;

import { Grid, Box } from '@mui/material';
import Button from '../Button';
//import TextField from '../TextField';
import {TextField} from '@mui/material'

import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAddUser } from '../../store/slices/admin/userAdminSlice';
import { isNewAccount, setAccountCreated } from '../../store/slices/login/loginPageSlice';
import Dropdown from '../Dropdown';
import Text from '../Text';
import Password from '../../features/Login/Password';
import CheckBox from '../Checkbox';
import endpoint from '../../api/endpoints';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import * as yup from "yup";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { KeyboardDatePicker } from "@material-ui/pickers";
import moment from "moment";
const schema = yup.object().shape({
    fullName: yup.string().required('Full name is required'),
    areaCode: yup.string().required('Area code is required'),
    mobileNumber: yup.number().required('Mobile number is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
    userType: yup.string(),
    dateOfBirth: yup.string().required('Date of birth is required'),
    accept: yup.bool().required('You must accept terms and conditions'),
    //userType: yup.string().required('Gender is required'),
});

function RegisterScreen() {
    const { addUser } = useSelector((state: any) => state.userAdmin);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);
    const YEARS = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

    const navigate = useNavigate();

    const { control, register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(schema)
    });

    const handleGenderChange = (value) => {
        setValue('userType', value); // Update userType value in react-hook-form
    };

    const handleAreaCodeChange = (value) => {
        setValue('areaCode', value); // Update areaCode value in react-hook-form
    };

    const handleOnChange = (e) => {
        // Implement your logic to handle changes in dateOfBirth fields if needed
    };

    const onSubmit = (data) => {
        const payload = {
            //userType: "CUST",
            fullName: data.fullName,
            emailAddress: data.email,
            password: data.password,
            dateOfBirth: `${data.birthYear}-${data.birthMonth}-${data.birthDate}`,
            userType: data.userType,
            areaCode: data.areaCode,
            accept: data.accept,
        };
        alert(JSON.stringify('data'))
        // Call your endpoint to register the user
        const response = endpoint.userRegister(payload);
        if (response) {
            setOpenSnackbar(true);
            setTimeout(() => {
                navigate('/');
            }, 1000);
        }
    };

    return (
        <div>
            <Grid item xs={12}>
                <Text variant="h4" align="center" name="Register or Login" />
            </Grid>
            <Box component="form" noValidate sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid item xs={12} sm={8}>
                            <TextField fullWidth label='Full name' size='small' id="fullName" variant="standard" {...register("fullName")} />
                            {errors.fullName && <p className='text-red-500 font-medium'>{errors.fullName.message}</p>}
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Dropdown
                                value={''} // Replace with actual value from state if applicable
                                onChange={handleGenderChange}
                                options={[
                                    { value: 'OC', label: 'Customer' },
                                    { value: 'BU', label: 'Business' },
                                ]}
                                label={"User type"}
                            />
                            {errors.userType && <p className='text-red-500 font-medium'>{errors.userType.message}</p>}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth label='Email address' size='small' id="email" variant="standard" {...register("email")} />
                            {errors.email && <p className='text-red-500 font-medium'>{errors.email.message}</p>}
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={3}>
                                    <Dropdown
                                        value={''} // Replace with actual value from state if applicable
                                        onChange={handleAreaCodeChange}
                                        options={[
                                            { value: '1', label: '+1' },
                                            { value: '44', label: '+44' },
                                            { value: '65', label: '+65' },
                                        ]}
                                        label={"Area Code"}
                                    />
                                    {errors.areaCode && <p className='text-red-500 font-medium'>{errors.areaCode.message}</p>}
                                </Grid>
                                <Grid item xs={12} sm={9}>
                                    <TextField
                                        required
                                        label="Mobile Number"
                                        variant="standard"
                                        fullWidth
                                        id="mobileNumber"
                                        {...register("mobileNumber")}
                                    />
                                    {errors.mobileNumber && <p className='text-red-500 font-medium'>{errors.mobileNumber.message}</p>}
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                        <Grid item xs={12}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
              name="dateOfBirth"
              control={control}
              defaultValue={null}
              render={({
                field: { onChange, value },
                fieldState: { error, invalid }
              }) => (
                <DatePicker
                  label="Date of birth"
                  disableFuture
                  value={value?.toString()}
                  onChange={(value) => onChange(value)}
                  renderInput={(params) => (
                    (
                      <TextField
                        error={invalid}
                        helperText={invalid ? error.message : null}
                        id="dateOfBirth"
                        variant="standard"
                        margin="dense"
                        fullWidth
                        color="primary"
                        autoComplete="bday"
                        {...params}
                      />
                    )
                  )}
                />
              )}
            />
          </LocalizationProvider>
                            {errors.dateOfBirth && <p className='text-red-500 font-medium'>{errors.dateOfBirth.message}</p>}
                        </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth label='Password' size='small' id="password" variant="standard" {...register("password")} />
                            {errors.password && <p className='text-red-500 font-medium'>{errors.password.message}</p>}
                        </Grid>
                        <Grid item xs={12} >
                            <CheckBox
                                value=""
                                label="I Agree to terms and conditions, privacy policy and terms of use"
                                {...register("accept")}
                            />
                            {errors.accept && <p className='text-red-500 font-medium'>{errors.accept.message}</p>}
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type='submit'
                                variant="contained"
                                fullWidth
                                className='contained'
                                name={"Create an account"}
                            />
                        </Grid>
                    </form>
                </Grid>
            </Box>
            {openSnackbar && (
                <Box sx={{ width: 500 }}>
                    <Snackbar
                        open={openSnackbar}
                        message="user created"
                        key={'top' + 'right'}
                    />
                </Box>
            )}
        </div>
    );
}

export default RegisterScreen
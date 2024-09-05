import React, { useState } from 'react';
import { Grid, Box, IconButton, InputAdornment, Link, TextField} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Button from '../../../components/Button';
// import TextField from '../../components/TextField';
import Text from '../../../components/Text';
import wrappedLayout from './wrappedLayout';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import endpoint from '../../../api/endpoints.ts';
import GetIcon from '../../../assets/Icon/icon.tsx';
import { useSnackbar } from '../../../components/Snackbar.tsx';
import * as yup from "yup";

const schema = yup.object().shape({
    emailId: yup.string().required(),
    newpassword: yup.string(),
    confirmPassword: yup.string(),
  });
  

function ForgotPassword () {
    
    const {register, handleSubmit, watch, formState: {errors}}: any = useForm({
        resolver: yupResolver(schema)
      });
    
      const [showPassword, setShowPassword] = useState(false)
          const showSnackbar = useSnackbar();
        const navigate = useNavigate();

    const handleClickShowPassword = () => setShowPassword(!showPassword);

    
    const mutation = useMutation({
    mutationFn:  (payload: any) => {
        return endpoint.forgotPassword(payload);
    },
    onSuccess:  (data: any) => {
        showSnackbar('Password update successfully', 'success');
        navigate('/')
    },
    onError:  () => {
        showSnackbar('something went wrong', 'error');
    }
    })

    const handlePasswordFormSubmit = (data: any) => {

    const payload = {
        //"loginId": "string",
        "password": "1234567",
        //"userType": "string",
        // "fullName": "string",
        "emailAddress": "string",
        "confirmPassword": "string",
        //"mobileCountryCode": "string",
        //"mobileNumber": "string",
        //"dob": "string",
        //"gender": "string",
        //"establishmentId": "string",
        //"usernameString": "string"
    }

    try {
        const res = mutation.mutate(payload);
        
        } catch (error) {
        console.error('Error during change password:', error);
        }
    }
    return ( 
        <>
            <form
            onSubmit={handleSubmit((data: any) => {
                handlePasswordFormSubmit(data)
            })}
            >
                <Box sx={styles.container}>

                    <Box sx={{alignSelf: 'end'}}>
                        <IconButton onClick={()=>{navigate('/')}}>
                            <GetIcon iconName="CloseIcon" /> 
                        </IconButton>
                    </Box>

                    <Box >
                        <Text sx={{fontSize: '32px', fontWeight: 600, color: '#4D4D4D', padding: '2px 14px'} }name={'Reset Password'}/>
                    </Box>
                    

                    <Box sx={{ padding: "10px" }}>
                        <TextField label={"Email"} fullWidth  type="text" size='small' variant="standard" {...register("emailId")}/>
                        {errors.emailId && <p className='text-red-500 font-medium'>{errors.emailId.message}</p>}
                    </Box>

                    <Box sx={{ padding: "10px" }}>
                        <TextField label={"New Password"}  fullWidth type={showPassword ? "text" : "password"} size='small'  variant="standard" {...register("newpassword")}
                        InputProps={{ endAdornment: ( <InputAdornment position="end">
                            <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword}>
                                {showPassword ? <Visibility /> : <VisibilityOff />} 
                                </IconButton></InputAdornment>),}}/>
                        {errors.newpassword && <p className='text-red-500 font-medium'>{errors.newpassword.message}</p>}
                    </Box>

                    <Box sx={{ padding: "10px" }}>
                        <TextField label={"Confirm Password"} fullWidth type={showPassword ? "text" : "password"} size='small'  variant="standard" {...register("confirmPassword")}
                        InputProps={{ endAdornment: ( <InputAdornment position="end">
                            <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword}>
                                {showPassword ? <Visibility /> : <VisibilityOff />} 
                                </IconButton></InputAdornment>),}}/>
                        {errors.confirmPassword && <p className='text-red-500 font-medium'>{errors.confirmPassword.message}</p>}
                    </Box>

                    <Box sx={{marginTop: 2}}>
                        <Button fullWidth type="submit" variant="contained" sx={styles.btn} name={"Confirm"}></Button>
                    </Box>
                </Box>
            </form>
        </>
    )
}

export default wrappedLayout(ForgotPassword);

const styles = {
    container : {
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: 1,
        margin: 1
      },
    btn: {
        width: '100%',
        color: '#FFFFFF',
        backgroundColor: '#825FFF',
        fontWeight: 600,
        fontSize: '20px',
        lineHeight: '24px',
        padding: '10px 40px 10px 40px',
        borderRadius: '10px',
        textTransform: 'none',
        '&:hover': {
          backgroundColor: '#5A3EBF',
        }
    },
}
import { Google, Facebook, Padding, BorderColor } from '@mui/icons-material'
import { Grid,Link, Box, MenuItem, Select, InputLabel, FormControl, SelectChangeEvent } from '@mui/material'
import Button from '../Button'
// import TextField from '../TextField'
import {TextField} from '@mui/material'
import React, { useEffect, useState } from 'react'
import ButtonRouter from '../ButtonRouter'
import { useDispatch } from 'react-redux';
import { isNewAccount } from '../../store/slices/login/loginPageSlice';
import { getRoute } from '../../utils';
import Text from '../Text';
import RegisterScreen from './RegisterScreen.tsx'
import GetIcon from '../../assets/Icon/icon.tsx'
import Buttons from '@mui/material/Button';
import { useNavigate } from 'react-router-dom'
import { useMutation, useQuery } from '@tanstack/react-query'
import endpoint from '../../api/endpoints.ts'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from "yup";
import Dropdown from '../Dropdown';
import { updateUser } from '../../store/slices/currentUserSlice.js'


const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
    userType: yup.string(),
  });

function RegisterLoginScreen({isInLoginModal}) {
    const [renderRegisterModal, setRenderRegisterModal] = useState(false);
    const [disableBtn, setDisableBtn] = useState(true);
    const [userdetails, setUserDetails] = useState(false);
    const [routeValue, setRouteValue] = useState(getRoute("Login"));
    const {register, handleSubmit, watch, formState: {errors}}: any = useForm({
        resolver: yupResolver(schema)
      });
      
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: (payload: any) => {
          return endpoint.getUserLoginToken(payload)
        },
        onSuccess: (response: any) => {
          setTimeout(() => {
          console.log('resposne : ', response)
            
          },1000)
        },
        onError: (response: any) => {
          alert('login unsuccess')
        },
        onSettled: () => {}
          
    })

    function getUserLoginTokenApi(data){
        const payLoad ={
            "loginId": data?.email,
            "password": data?.password,
            "userType": data?.userType
          }
        mutation.mutate(payLoad)

        // setTimeout(()=>{
        // console.log('tokenDetails', tokenDetails.response);

        // }, 1000)

        // const loginPayLoad = {
        //     "email": "admin1@lavender.com",
        //     "password": "12345"
        // }
        setUserDetails(true);
    }
    const handleClickContinue = (data) => {
        
        getUserLoginTokenApi(data);

        navigate("/");

        if(!disableBtn){
            //dispatch(isNewAccount({ newAccount: true }));
        }

    }

    function handleButton(){
        setRenderRegisterModal(true);
    }
    
  function handleRegisterClick(){
    navigate("/register");
  }
  const handleUserChange = (eventevent) => {
    //setUserType();
};

  return (
    <>
    {
        renderRegisterModal
        ?
        <RegisterScreen />
        :
        <Grid item spacing={7} sx={{padding: ''}} >
            <form
                onSubmit={handleSubmit((data: any) => {
                    handleClickContinue(data);
                    // handleSaveButton(JSON.stringify(data));
                })}
            >
                <Grid item xs={12} >
                    <Box sx={{padding: '10px', display: 'flex', justifyContent: 'center'}}>
                        <div style={{display: 'flex'}}>
                            <GetIcon className='cursor-pointer' iconName='LavenderLogo'/>
                            <Text className="cursor-pointer flex" variant="h6" sx={{ flexGrow: 1, color: '#1B1464', fontWeight: '700' }} name="Lavender"/>
                        </div>
                    </Box>
                </Grid>

                <Grid item xs={12} sx={{padding: '10px'}}>
                    <Text variant="h4" align="center" sx={{color: '#545454'}} name="Register or Login" />
                </Grid>

                <Grid item xs={12} sx={{padding: '10px'}}>
                    <p style={{color: '#545454'}}>{<Link onClick={()=>handleRegisterClick()}>Register</Link>}To Create an account or login to book your next salon experience with Lavender. </p>

                </Grid>

                <Grid item xs={12} spacing={1} className='login-side-buttons' sx={{padding: '10px'}}>
                    <Button
                        sx={{color: '#4D4D4D'}}
                        variant="outlined"
                        fullWidth
                        disableElevation
                        startIcon={<Google />}
                        className="login"
                        name={"Continue with Google"}
                    />
                    <Button variant="outlined"
                        sx={{color: '#4D4D4D'}}
                        fullWidth
                        disableElevation
                        startIcon={<Facebook />}
                        className="login"
                        name={"Continue with Facebook"}

                    />
                </Grid>

                <Grid item xs={12}>
                    <Text variant="body1" sx={{color: '#545454'}} align="center" name="-OR-"/>
                </Grid>

                <Grid item spacing={1} xs={12} sx={{padding: '10px'}}>
                    <TextField fullWidth label='Email address' size='small' id="outlined-basic" variant="standard" {...register("email")} />
                    {errors.email && <p className='text-red-500 font-medium'>{errors.email.message}</p>}
                </Grid>

                <Grid item spacing={1} xs={12} sx={{padding: '10px'}}>
                    <TextField fullWidth label='Password' size='small' id="outlined-basic" variant="standard" {...register("password")} />
                    {errors.password && <p className='text-red-500 font-medium'>{errors.password.message}</p>}
                </Grid>
                <Grid item spacing={1} xs={12} sx={{padding: '10px'}}>
                    <select {...register("userType")}>
        <option value="OC">Customer</option>
        <option value="BU">Business</option>
      </select>
                 
                    {errors.userType && <p className='text-red-500 font-medium'>{errors.userType.message}</p>}
                </Grid>

                {/* <Grid item xs={12}>
                    {isInLoginModal
                    ? <Button 
                        sx={{backgroundColor: '#825FFF', padding: '10px'}} 
                        variant="contained" 
                        fullWidth 
                        className='continue' 
                        name={"Continue"} 
                        onClick={() => handleButton()} 
                        disabled={true} />
                    : <Button
                    variant="contained"
                    fullWidth
                    className='continue'
                    name={"Continue"}
                    type="submit"
                    />}

                </Grid> */}

                <Button fullWidth type="submit" variant="contained" sx={{fontSize: '14px'}} name={'Continue'}></Button>

            </form>
        </Grid>
    }
    </>

  )
}


export default RegisterLoginScreen
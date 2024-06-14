import { Google, Facebook, Padding, BorderColor } from '@mui/icons-material'
import { Grid,Link, Box } from '@mui/material'
import Button from '../Button'
import TextField from '../TextField'
import React, { useState } from 'react'
import ButtonRouter from '../ButtonRouter'
import { useDispatch } from 'react-redux';
import { isNewAccount } from '../../store/slices/login/loginPageSlice';
import { getRoute } from '../../utils';
import Text from '../Text';
import RegisterScreen from './RegisterScreen.tsx'
import GetIcon from '../../assets/Icon/icon.tsx'
import Buttons from '@mui/material/Button';
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import endpoint from '../../api/endpoints.ts'



function RegisterLoginScreen({isInLoginModal}) {
    const [renderRegisterModal, setRenderRegisterModal] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [disableBtn, setDisableBtn] = useState(true);
    const [routeValue, setRouteValue] = useState(getRoute("Login"));

    const dispatch = useDispatch();
    const navigate = useNavigate();

    function getUserLoginTokenApi(){
        debugger;
        const payLoad ={
            "loginId": email,
            "password": password,
            "userType":"OC"
          }
        // eslint-disable-next-line react-hooks/rules-of-hooks
        let tokenDetails;
        tokenDetails =  endpoint.getUserLoginToken(payLoad);

        setTimeout(()=>{
        console.log('tokenDetails', tokenDetails.response);

        }, 1000)

        const loginPayLoad = {
            "email": "admin1@lavender.com",
            "password": "12345"
        }

        const currentUserDetails = endpoint.getCurrentUserDetails(loginPayLoad)
    }
    const handleClickContinue = () => {
        
        console.log('email : ',email)
        console.log('password : ',password)

        if(!disableBtn){
            dispatch(isNewAccount({ newAccount: true }));
            navigate("/");
        }

        getUserLoginTokenApi();
    }

    function handleButton(){
        setRenderRegisterModal(true);
        console.log('hiii in butoon');
    }


    

  const handleInputFieldChange = (key, value) => {
    console.log('evnt ; ', value)
    setEmail(value);

    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(value)) {
      setError("Please enter a valid email address");
      setDisableBtn(true);
    } else {
      setError("");
      setDisableBtn(false);
    }
  };

  const handlePasswordFieldChange = (key, value) => {
    console.log('evnt ; ', value)
    setPassword(value);

    // // Regular expression for email validation
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // if (!emailRegex.test(value)) {
    //   setError("Please enter a valid email address");
    //   setDisableBtn(true);
    // } else {
    //   setError("");
    //   setDisableBtn(false);
    // }
  };
  function handleRegisterClick(){
    navigate("/register");
  }

  return (
    <>
    {
        renderRegisterModal
        ?
        <RegisterScreen />
        :
        <Grid item spacing={7} sx={{padding: ''}} >

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
                <TextField 
                autoFocus
                label="Email Address" 
                variant="standard" 
                value={email} 
                fullWidth 
                onChange={handleInputFieldChange} 
                helperText={error} 
                sx={{
                    "& .MuiFormHelperText-root": {
                      color: error ? "red" : "inherit"
                    }
                  }}/>
            </Grid>

            <Grid item spacing={1} xs={12} sx={{padding: '10px'}}>
                <TextField 
                label="Password" 
                variant="standard" 
                value={password} 
                fullWidth 
                onChange={handlePasswordFieldChange} 
                type="password"
                sx={{fontSize: '30px'}}
                />
            </Grid>

            <Grid item xs={12}>
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
                onClick={()=> handleClickContinue()}
                />}

            </Grid>
        </Grid>
    }
    </>

  )
}

export default RegisterLoginScreen
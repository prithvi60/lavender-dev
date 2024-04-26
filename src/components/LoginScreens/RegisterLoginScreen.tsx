import { Google, Facebook, Padding, BorderColor } from '@mui/icons-material'
import { Grid, Box } from '@mui/material'
import Button from '../Button'
import TextField from '../TextField'
import React, { useState } from 'react'
import ButtonRouter from '../ButtonRouter'
import { useDispatch } from 'react-redux';
import { isNewAccount } from '../../store/slices/login/loginPageSlice';
import { getRoute } from '../../utils';
import emptyLogo from "../../assets/emptyImage.png";
import Text from '../Text';
import RegisterScreen from './RegisterScreen.tsx'
import GetIcon from '../../assets/Icon/icon.tsx'
import Buttons from '@mui/material/Button';



function RegisterLoginScreen({isInLoginModal}) {
    const [renderRegisterModal, setRenderRegisterModal] = useState(false);
    const dispatch = useDispatch();

    const handleClickContinue = () => {
        dispatch(isNewAccount({ newAccount: true }));
        return getRoute("Register");
    }

    function handleButton(){
        setRenderRegisterModal(true);
        console.log('hiii in butoon');
    }

  return (
    <>
    {
        renderRegisterModal
        ?
        <RegisterScreen />
        :
        <Grid item spacing={7} sx={{padding: ''}}>

            <Grid item xs={12} >
                <Box sx={{padding: '10px', display: 'flex', justifyContent: 'center'}}>
                    {/* <img src={emptyLogo} alt="Logo" style={{ width: '15%' }} /> */}
                    {/* <GetIcon className='cursor-pointer' onClick= {gotoLandingPage} iconName='LavenderLogo'/> */}
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
                <Text variant="body1" align="left" sx={{color: '#545454'}} name="Create an account or login to book your next salon experience with Lavender" />
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
                <TextField label="Email Address" variant="standard" fullWidth />
            </Grid>

            <Grid item xs={12}>
                {isInLoginModal
                ? <Button sx={{backgroundColor: '#825FFF', padding: '10px'}} variant="contained" fullWidth className='continue' name={"Continue"} onClick={() => handleButton()}></Button>
                : <ButtonRouter
                variant="contained"
                fullWidth
                className='continue'
                name={"Continue"}
                to={handleClickContinue()}
                />}

            </Grid>
        </Grid>
    }
    </>

  )
}

export default RegisterLoginScreen
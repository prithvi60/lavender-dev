import React from 'react';
import { useDispatch } from 'react-redux';
import { Grid, Box } from '@mui/material';
import { Google, Facebook } from '@mui/icons-material';
import Button from '../../components/Button';
import TextField from '../../components/TextField';
import Text from '../../components/Text';
import { isNewAccount } from '../../store/slices/login/loginPageSlice';

import emptyLogo from '../../assets/emptyImage.png';

const LoginLanding = () => {
    const dispatch = useDispatch();

    const handleClickContinue = () => {
        dispatch(isNewAccount({ newAccount: true }));
    }

    return ( 
        <>
            <Grid item xs={12}>
                <Box>
                    <img src={emptyLogo} alt="Logo" style={{ width: '15%' }} />
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Text variant="h4" align="center" name="Register or Login" />
            </Grid>
            <Grid item xs={12}>
                <Text variant="body1" align="left" name="Create an account or login to book your next salon experience with Lavender" />
            </Grid>
            <Grid item xs={12} className='login-side-buttons'>
                <Button
                    variant="outlined"
                    fullWidth
                    disableElevation
                    startIcon={<Google />}
                    className="login"
                    name={"Continue with Google"}
                />
                <Button variant="outlined"
                    fullWidth
                    disableElevation
                    startIcon={<Facebook />}
                    className="login"
                    name={"Continue with Facebook"}
                    
                />
            </Grid>
            <Grid item xs={12}>
                <Text variant="body1" align="center" name="-OR-"/>
            </Grid>
            <Grid item xs={12}>
                <TextField label="Email Address" variant="standard" fullWidth />
            </Grid>
            <Grid item xs={12}>
                <Button
                    variant="contained"
                    fullWidth
                    className='continue'
                    name={"Continue"}
                    onClick={handleClickContinue}
                />
            </Grid>
        </>
     );
}

export default LoginLanding;
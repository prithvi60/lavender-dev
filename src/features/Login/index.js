import React from 'react';
import { useSelector } from 'react-redux';
import { Paper, Typography, Grid, useMediaQuery, useTheme } from '@mui/material';
import RegisterSide from './RegisterSide';
import LoginLanding from './LoginLanding';
import SingInSide from './SignInSide';

const Login = () => {
    const { newAccount, accountCreated } = useSelector((state) => state.loginPage);

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Grid container justifyContent="center" alignItems="center">
            {
                !isSmallScreen &&
                <Grid item xs={4} className='login-banner'>
                    <Typography className='title'>Discover me time</Typography>
                    <Typography className='subtitle'>Book your next salon experience with Lavender</Typography>
                </Grid>
            }

            <Grid item xs={!isSmallScreen ? 8 : 12}>
                <Paper elevation={3} className='login-subcontainer'>
                    {!newAccount && !accountCreated && <LoginLanding />}
                    {newAccount && <RegisterSide />}
                    {accountCreated && <SingInSide />}
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Login;

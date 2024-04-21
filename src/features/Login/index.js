import React from 'react';
import { useSelector } from 'react-redux';
import { Paper, Typography, Grid, useMediaQuery, useTheme } from '@mui/material';

const Login = ({children}) => {
    const { newAccount, accountCreated } = useSelector((state) => state.loginPage);

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <>
            <Grid container spacing={0} className="background-grids">
                <Grid item xs={7} className="background-grid cover" />
                <Grid item xs={5} className="background-grid" />
            </Grid>
            <Grid container spacing={5} justifyContent="center" alignItems="center" className="login-container">
                <Grid item xs={12}>
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
                                <main>{children}</main>
                                {/* {!newAccount && !accountCreated && <LoginLanding />}
                                {newAccount && <RegisterSide />}
                                {accountCreated && <SingInSide />} */}
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
        
    );
};

export default Login;

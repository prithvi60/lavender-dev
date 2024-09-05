import React from 'react';
import { useSelector } from 'react-redux';
import { Paper, Grid, useMediaQuery, useTheme, IconButton, Box } from '@mui/material';
import Text from '../../components/Text';
import GetIcon from '../../assets/Icon/icon';
import { useNavigate  } from 'react-router-dom';

const Login = ({children}) => {
    const { newAccount, accountCreated } = useSelector((state) => state.loginPage);
    // const location = useLocation()
    // console.log(location.pathname);
    

    const navigate = useNavigate();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Grid container spacing={5} justifyContent="center" alignItems="center" className="login-container">
            <Grid item xs={12}>
                <Grid container justifyContent="center" alignItems="center">
                    {!isSmallScreen && (
                        <Grid item xs={5} sx={{ position: 'relative', top: '-20px', minHeight: '500px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <Grid container alignItems="center" justifyContent="center">
                                <IconButton onClick={() =>navigate(-1)} sx={{ position: 'absolute', top: 0, left: 0 }}>
                                    <GetIcon sx={{ cursor: 'pointer' }} iconName='BackIconWhite' />
                                </IconButton>
                            </Grid>
                            <Box sx={{ paddingTop: '10px' }}>
                                <Text name={'Discover me time'} sx={styles.title} align={'right'}>Discover me time</Text>
                                <Text name={'Book your next salon experience with Lavender'} sx={styles.subtitle} align={'right'}></Text>
                            </Box>
                        </Grid>
                    )}

                    <Grid item xs={!isSmallScreen ? 7 : 12}>
                        <Paper elevation={3} className='login-subcontainer'>
                            <main>{children}</main>
                            {/* Render components based on conditions */}
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Login;

const styles = {
    title: {
        fontSize: '42px',
        fontWeight: 700,
        color: "#FFFFFF",
        lineHeight: '51px',
        p: 1
    },
    subtitle: {
        fontSize: '31px',
        fontWeight: 400,
        color: "#FFFFFF",
        lineHeight: '38px'
    }
};

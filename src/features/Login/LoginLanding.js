import React from 'react';
import { useDispatch } from 'react-redux';
import { Grid, Box } from '@mui/material';
import { Google, Facebook } from '@mui/icons-material';
import Button from '../../components/Button';
import TextField from '../../components/TextField';
import Text from '../../components/Text';
import { isNewAccount } from '../../store/slices/login/loginPageSlice';
import wrappedLayout from './wrappedLayout';
import { getRoute } from '../../utils'; 
import ButtonRouter from '../../components/ButtonRouter';

import emptyLogo from '../../assets/emptyImage.png';
import RegisterLoginScreen from '../../components/LoginScreens/RegisterLoginScreen.tsx';

const LoginLanding = () => {
    
    const [isInLoginModal, setIsInLoginModal] = React.useState(false);

    return ( 
        <div className="login-landing">
            <RegisterLoginScreen isInLoginModal={isInLoginModal}/>
        </div>
     );
}

export default wrappedLayout(LoginLanding);
import wrappedLayout from './wrappedLayout';
import RegisterLoginScreen from '../../components/LoginScreens/RegisterLoginScreen.tsx';

const LoginLanding = () => {
    
    return ( 
        <div className="login-landing">
            <RegisterLoginScreen isInLoginModal={false}/>
        </div>
     );
}

export default wrappedLayout(LoginLanding);
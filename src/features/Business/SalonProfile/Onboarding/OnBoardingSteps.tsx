import React, { useState } from 'react';
import { FormStep1 } from './FormStep1';
import BusinessHeader from '../../BusinessHeader';
import LinearProgress from '@mui/material/LinearProgress'; 
import { FormStep2 } from './FormStep2';
import { FormStep3 } from './FormStep3';
import { FormStep4 } from './FormStep4';
import { FormStep5 } from './FormStep5';

const OnBoardingSteps = () => {
    const [activeStep, setActiveStep] = useState(0); 
    const progress = ((activeStep / 3) * 100);
    
    
    return (
        <div className='w-full h-screen urbanist-font overflow-hidden'>
            <BusinessHeader
                pageName={"onboard"}
                toggleSidebar={""}
            />
               <LinearProgress variant="determinate" value={progress} sx={{
                
                "& .MuiLinearProgress-barColorPrimary": {
                  backgroundColor:"#825FFF"
                  },
                  backgroundColor:"#E0B8FF"
               }} /> 
            <div>
                {activeStep === 0 && <FormStep1 setActiveStep={setActiveStep}/>}
                {activeStep === 1 && <div> 
                    <FormStep2 setActiveStep={setActiveStep}/>
                </div>}
                {/* {activeStep === 2 && <div> 
                    <FormStep3 setActiveStep={setActiveStep}/>
                </div>} */}
                {activeStep === 2 && <div> 
                    <FormStep4 setActiveStep={setActiveStep}/>
                </div>}
                {activeStep === 3 && <div> 
                    <FormStep5 setActiveStep={setActiveStep}/>
                </div>}
               
            </div>
        </div>
    );
};

export default OnBoardingSteps;
import React, { useState } from 'react';
import { FormStep1 } from './FormStep1';
import BusinessHeader from '../../BusinessHeader';
import { OnBoardFooter } from './OnBoardFooter';
import LinearProgress from '@mui/material/LinearProgress'; 
import { FormStep2 } from './FormStep2';
import { FormStep3 } from './FormStep3';

const OnBoardingSteps = () => {
    const [activeStep, setActiveStep] = useState(0); 
    const progress = ((activeStep / 3) * 100);
    return (
        <div className='w-full h-screen urbanist-font overflow-hidden'>
            <BusinessHeader
                pageName={"onboard"}
                toggleSidebar={""}
            />
               <LinearProgress variant="determinate" value={progress} color="primary" /> 
            <div>
                {activeStep === 0 && <FormStep1 />}
                {activeStep === 1 && <div> 
                    <FormStep2/>
                </div>}
                {activeStep === 2 && <div> 
                    <FormStep3/>
                </div>}
               
            </div>
            <OnBoardFooter setActiveStep={setActiveStep} />
        </div>
    );
};

export default OnBoardingSteps;
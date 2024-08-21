import React from 'react'
import { FormStep1 } from './FormStep1'
import BusinessHeader from '../BusinessHeader'
import { OnBoardFooter } from './OnBoardFooter'

const OnBoardingSteps = () => {
    return (
        <div className='w-full h-screen urbanist-font'>
            <BusinessHeader
                pageName={""}
                toggleSidebar={""}
            />
            <FormStep1 />
            <OnBoardFooter/>
        </div>
    )
}

export default OnBoardingSteps

import React from 'react'
import '../styles/landing.css'
import Button from '../components/Button'
function LearnMore() {
    return (
        <div className='learn-more text-center mt-12 mx-2'>
            <div className='urbanist-font text-2xl md:text-3xl font-bold'>Discover salons to add to your self-care routine</div>
            <div className='urbanist-font text-2xl md:text-3xl font-bold mt-1'></div>

            <div className="urbanist-font mt-4 max-w-96	mx-auto mb-6">We prioritize your convenience and aim to create a seamless and relaxing experience from booking to service delivery.</div>
            <Button variant='contained' name={"Learn more"}></Button>
        </div>
    )
}

export default LearnMore
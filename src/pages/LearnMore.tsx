import React from 'react'
import '../styles/landing.css'
import Button from '../components/Button'
function LearnMore() {
    return (
        <div className='learn-more text-center'>
            <div className='urbanist-font text-3xl font-bold'>Discover salons to add to</div>
            <div className='urbanist-font text-3xl font-bold mt-1'>your self-care routine</div>

            <div className="urbanist-font mt-4">We prioritize your convenience and aim to create a seamless and </div>
            <div className="urbanist-font ">relaxing experience from booking to service delivery.</div>
            <Button variant='contained' name={"Learn more"}></Button>
        </div>
    )
}

export default LearnMore
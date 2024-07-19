import React from "react";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import StoreIcon from '@mui/icons-material/Store';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import TextField from "@mui/material/TextField";
import { Checkbox, FormControlLabel, Typography } from "@mui/material";
import LoginModal from "./LoginModal/LoginModal.tsx";
import GetIcon from "../../assets/Icon/icon";

export default function ConfirmScreen(props) {

    const {estData, onSetActiveStep}=props

    return <div className='mt-2 md:mx-16 my-10 h-full urbanist-font'>
        <div className='flex gap-1 mb-2 items-center gap-3'>
            <p onClick={()=>onSetActiveStep(1)}><GetIcon iconName='BackIcon'/></p>
            <div className='font-bold text-2xl md:text-3xl'>Confirm</div>
        </div>

        <span className="bg-gray-200 w-full px-6 h-fit py-4 rounded-xl w-96 gap-3 font-semibold flex items-center">
            <GetIcon iconName='StoreIcon' />
            Pay at Venue 
            <div className="ms-auto">
                <Checkbox className="checkBoxCommon" onChange={() => { }} />
            </div>
        </span>

        <div className="ml-6 mt-4">

            <p className="font-semibold mb-4">Fill your details</p>
            <p className="text-sm mb-4">We recommend you to register in Lavender. By registering, you gain access to exclusive features tailored just for you. <LoginModal/></p>

            <div className="flex gap-3 flex-col">
                <TextField fullWidth className="" id="standard-basic" label="Full Name" variant="standard" />
                <TextField fullWidth className="my-4" id="EmailAddress" label="Email Address" variant="standard" />
            </div>

            <p className="mb-2 mt-6 text-sm">Wanna Leave Appointment notes? (optional) </p>
            <TextField
                id="outlined-multiline-static"
                //   label="Multiline"
                multiline
                rows={4}
                className="w-full font-mono rounded-2xl"
                placeholder="You can specify your requirements to the salon staffs"
            />

            <FormControlLabel
                className="my-4 text-sm"
                label="I Agree to terms and condition, privacy policy and terms of use"
                control={<Checkbox className="checkBoxCommon" onChange={() => { }} />}
            />
            <FormControlLabel
                //   classes={}
                label="Sign me up to receive marketing offers from Lavender"
                control={<Checkbox className="checkBoxCommon" onChange={() => { }} />}
            />

        </div>

        <div className="ml-6">
            <p className="font-bold my-4">Cancellation policy</p>
            <p className="mb-2">1. To cancel an appointment, we require a minimum of 24 hours' notice prior to the scheduled appointment time.</p>
            <p className="mb-2">2. Failure to provide the required notice may result in a cancellation fee equivalent to 50% of the service cost.</p>
            <p className="mb-2">3. Same-day cancellations or no-shows will be subject to a cancellation fee equal to the full cost of the scheduled service.</p>
        </div>

    </div>


}
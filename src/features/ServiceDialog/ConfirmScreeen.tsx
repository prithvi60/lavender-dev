import React, { useEffect, useState } from "react";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import StoreIcon from '@mui/icons-material/Store';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import TextField from "@mui/material/TextField";
import { Checkbox, FormControlLabel, IconButton, Typography } from "@mui/material";
import LoginModal from "./LoginModal/LoginModal.tsx";
import GetIcon from "../../assets/Icon/icon";
import { getBrowserCache } from "../../api/constants.ts";
import { useDispatch } from "react-redux";
import { UpdateTermsNConditions } from "../../store/slices/Booking/ScheduleAppoinmentSlice.ts";
import Text from "../../components/Text.js";

export default function ConfirmScreen(props) {
    const {  onSetActiveStep } = props;
    const dispatch = useDispatch();

    // State variables for checkboxes
    const [payAtVenueChecked, setPayAtVenueChecked] = useState(false);
    const [termsAndConditionsChecked, setTermsAndConditionsChecked] = useState(false);
    const [marketingOffersChecked, setMarketingOffersChecked] = useState(false);
    const [isUser, setIsUser] = useState(false);
    const [appointmentNotes, setAppointmentNotes] = useState(""); // State for appointment notes
    const [termsError, setTermsError] = useState(false);
    const [userId, setUserId] = useState("")
    //const userId = getBrowserCache("UserId") || "";

    useEffect(() => {
        dispatch(UpdateTermsNConditions({
            payAtVenue: payAtVenueChecked,
            tncAgree: termsAndConditionsChecked,
            promotionAgree: marketingOffersChecked,
            serviceNotes: appointmentNotes,
        }));
    }, [payAtVenueChecked, termsAndConditionsChecked, marketingOffersChecked, appointmentNotes]);

    useEffect(()=>{
        const id = getBrowserCache("UserId") || "";
        setUserId(id)
        if (!termsAndConditionsChecked) {
            setTermsError(true); // Set error state to true if terms are not checked
        } else {
            setTermsError(false); // Reset error state if terms are checked
        }
    }, [])

    useEffect(()=>{
        if(userId?.length > 0){
            setIsUser(true);
        }
    }, [userId])
    
    return (
        <div className='h-full my-10 mt-2 md:mx-16 urbanist-font'>
            <div className='flex items-center gap-1 gap-3 mb-2'>
                <IconButton onClick={() => onSetActiveStep(1)}><GetIcon iconName='BackIconArrow'/></IconButton>
                <div className='text-2xl font-bold md:text-3xl'>Confirm</div>
            </div>

            <span className="flex items-center w-full gap-3 px-6 py-4 mt-4 font-semibold bg-gray-200 h-fit rounded-xl w-96">
                <GetIcon iconName='StoreIcon' />
                <Text name={"Pay at Venue"} sx={{fontSize: '18px', fontWeight: 700, color: '#4D4D4D'}}/>
                <div className="ms-auto">
                    <Checkbox
                        className="checkBoxCommon"
                        checked={payAtVenueChecked}
                        onChange={(e) => setPayAtVenueChecked(e.target.checked)}
                    />
                </div>
            </span>

            <div className="mt-4">
                {!isUser && 
                 <div> 
                    <p style={{marginBottom: 4, marginTop: 0, fontSize: '20px', fontWeight: 600, color: '#4D4D4D'}}>Fill your details</p>
                    <p style={{marginBottom: 4, marginTop: 0, fontSize: '16px', fontWeight: 400, color: '#4D4D4D'}}>We recommend you to register in Lavender. By registering, you gain access to exclusive features tailored just for you. <LoginModal/></p>

                    <div className="flex flex-col gap-3">
                        <TextField fullWidth sx={{color: '#808080', fontSize: '20px', fontWeight: 400}} id="standard-basic" label="Full Name" variant="standard" />
                        <TextField fullWidth sx={{marginTop: 4, marginBottom: 4, color: '#808080', fontSize: '20px', fontWeight: 400}} id="EmailAddress" label="Email Address" variant="standard" />
                    </div>

                 </div>
                }
                

                <p style={{marginBottom: 2, marginTop: 6, fontSize: '16px', fontWeight: 400, color: '#4D4D4D'}}>Wanna Leave Appointment notes? (optional) </p>
                <TextField
                    id="outlined-multiline-static"
                    multiline
                    rows={4}
                    className="w-full font-mono rounded-2xl"
                    placeholder="You can specify your requirements to the salon staffs"
                    value={appointmentNotes} // Bind value to state variable
                    onChange={(e) => setAppointmentNotes(e.target.value)} // Update state on change
                />

                <FormControlLabel
                    sx={{marginBottom: 0, marginTop: 4, fontSize: '16px', fontWeight: 400, color: '#4D4D4D'}}
                    label="I Agree to terms and condition, privacy policy and terms of use"
                    control={<Checkbox
                        className={`checkBoxCommon ${termsError ? 'errorCheckbox' : ''}`} // Conditionally apply error style
                        checked={termsAndConditionsChecked}
                        onChange={(e) => {
                            setTermsAndConditionsChecked(e.target.checked);
                            setTermsError(false); // Reset error when user interacts with checkbox
                        }}
                    />}
                />
                {termsError && <div style={{color: 'red'}} className="errorText">Please agree to terms and conditions.</div>} {/* Display error text */}
                <FormControlLabel
                sx={{marginBottom: 3, marginTop: 1, fontSize: '16px', fontWeight: 400, color: '#4D4D4D'}}
                    label="Sign me up to receive marketing offers from Lavender"
                    control={<Checkbox
                        className="checkBoxCommon"
                        checked={marketingOffersChecked}
                        onChange={(e) => setMarketingOffersChecked(e.target.checked)}
                    />}
                />
            </div>

            <div className="ml-6">
                <p  style={{marginBottom: 4, marginTop: 0, fontSize: '18px', fontWeight: 700, color: '#4D4D4D'}}>Cancellation policy</p>
                <p style={{marginBottom: 2, marginTop: 0, fontSize: '16px', fontWeight: 400, color: '#808080'}}>1. To cancel an appointment, we require a minimum of 24 hours' notice prior to the scheduled appointment time.</p>
                <p style={{marginBottom: 2, marginTop: 0, fontSize: '16px', fontWeight: 400, color: '#808080'}}>2. Failure to provide the required notice may result in a cancellation fee equivalent to 50% of the service cost.</p>
                <p style={{marginBottom: 2, marginTop: 0, fontSize: '16px', fontWeight: 400, color: '#808080'}}>3. Same-day cancellations or no-shows will be subject to a cancellation fee equal to the full cost of the scheduled service.</p>
            </div>
        </div>
    );
}

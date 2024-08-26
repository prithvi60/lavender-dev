import React, { useEffect, useState } from "react";
import { Button, Grid, Typography } from "@mui/material";
import { WorkingHours } from "../SalonProfileSteps/BusinessInfo/WorkingHours";
import Buttons from "../../../../components/Button";
import { useSelector } from "react-redux";
import endpoint from "../../../../api/endpoints";

export const FormStep2 = ({setActiveStep}) => {
const [availableDays, setAvailableDays] = useState([]); 
const [saveWorkingHours,setSaveWorkingHours]=useState(false);
const [proceed,setProceed]=useState(false);

const userDetails: any = useSelector((state: any) => {
  return state?.currentUserDetails;
});

const establishmentId: any =
  userDetails != null ? userDetails?.establishmentId : "";

useEffect(() => {
  const getEstablishmentDetails = async () => {
    const establishmentData = await endpoint.getEstablishmentDetailsById(
      establishmentId
    );
    if (establishmentData?.data?.success) {
      setAvailableDays(establishmentData?.data?.data?.availableDays);
    }
  };

  getEstablishmentDetails();
}, []);

useEffect(() => {
  if (proceed) {
    setActiveStep((prevStep) => prevStep + 1);
  }
}, [proceed]); 

  return (
    <>
    <section
      className="w-full flex justify-center items-center flex-1 overflow-y-auto pt-64 flex-col"
      style={{ height: "80vh" }}
    >
      <div style={{ width: "40%"}}>
        <h5 className="text-sm mb-2.5">Step 2</h5>
        <h4 className="tetx-xl md:text-4xl tracking-wide mb-10 font-bold">
          Tell Us When You're Open
        </h4>
        </div>
        <Grid container spacing={2} padding={"20px"} style={{ width: "80%"}}>
          <Grid item >

            <WorkingHours
              userDetails={userDetails}
              availableDays={availableDays}
              page={"onboard"}
              saveWorkingHours={saveWorkingHours}
              setProceed={setProceed}
            />
          </Grid>
        </Grid>
    </section>
     <footer className='w-full px-4 flex justify-between items-center border-2 absolute bottom-0 bg-white' style={{height: "10vh"}}>
     <Button variant="text" size='large' sx={{textTransform:"none", fontWeight: 'bold', color: '#825FFF', fontSize: '18px'}} 
   onClick={() => setActiveStep((prevStep) =>  prevStep - 1 )}
     >Back</Button>
   
             <Buttons sx={{ borderRadius: '10px', padding: '10px 40px 10px 40px', textTransform: 'none', fontSize: '18px', fontWeight: 600, '@media (max-width: 600px)': { padding: '10px 20px 10px 20px', fontSize: '14px' } }} variant='contained'  onClick={() => {
      setSaveWorkingHours(true)
     }} name={!saveWorkingHours?'Proceed':`Loading...`}> </Buttons>
 </footer>
 </>
  );
};

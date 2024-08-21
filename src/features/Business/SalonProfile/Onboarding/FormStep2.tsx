import React, { useState } from "react";
import { Grid, Typography } from "@mui/material";
import { WorkingHours } from "../SalonProfileSteps/BusinessInfo/WorkingHours";

export const FormStep2 = () => {
  const [userDetails, setUserDetails] = useState(null); // Initialize userDetails state
  const [availableDays, setAvailableDays] = useState([]); // Initialize availableDays state

  return (
    <section
      className="w-full flex justify-center items-center flex-1 overflow-y-auto pt-64 flex-col"
      style={{ height: "80vh" }}
    >
      <div style={{ width: "40%"}}>
        <h5 className="text-sm mb-2.5">Step 2</h5>
        <h4 className="tetx-xl md:text-3xl tracking-wide mb-10">
          Enter the working hours
        </h4>
        </div>
        <Grid container spacing={2} padding={"20px"} style={{ width: "80%"}}>
          <Grid item >

            <WorkingHours
              userDetails={userDetails}
              availableDays={availableDays}
              page={"onboard"}
            />
          </Grid>
        </Grid>
    </section>
  );
};

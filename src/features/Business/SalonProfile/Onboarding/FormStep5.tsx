import React, { useEffect, useState } from "react";
import { Button, Grid, Typography } from "@mui/material";
import { WorkingHours } from "../SalonProfileSteps/BusinessInfo/WorkingHours";
import { Box } from "lucide-react";
import endpoint from "../../../../api/endpoints";
import { useSelector } from "react-redux";

export const FormStep5 = ({ setActiveStep }) => {
  
  return (
    <>
      <section
        className="w-full flex  items-center flex-1 overflow-y-auto pt-32 flex-col"
        style={{ height: "80vh" }}
      >
        <div style={{ width: "40%" }}>
          <h5 className="text-sm mb-2.5">Step 5</h5>
          <h4 className="tetx-xl md:text-4xl tracking-wide mb-10 font-bold">
            Publish
          </h4>
        </div>
      </section>
      <footer
        className="w-full px-4 flex justify-between items-center border-2 absolute bottom-0 bg-white"
        style={{ height: "10vh" }}
      >
        <Button
          variant="text"
          size="large"
          
          sx={{ textTransform: "none", fontWeight: "bold", color: '#825FFF', fontSize: '18px' }}
          onClick={() => setActiveStep((prevStep) => prevStep - 1)}
        >
          Back
        </Button>
      </footer>
    </>
  );
};

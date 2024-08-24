import React, { useEffect, useState } from "react";
import { Button, Grid, Typography } from "@mui/material";
import { WorkingHours } from "../SalonProfileSteps/BusinessInfo/WorkingHours";
import { Box } from "lucide-react";
import endpoint from "../../../../api/endpoints";
import { useSelector } from "react-redux";

export const FormStep5 = ({ setActiveStep }) => {
  const [isPublish, setIsPublish] = useState<boolean>(false);

  const userDetails = useSelector((state: any) => state?.currentUserDetails);

  const publishEstablishment = async (payLoad) => {
    try {
      const response = await endpoint.publishEstablishment(payLoad);
      const res = response?.data;
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };
  useEffect(() => {
    if (isPublish) {
      const payLoad = {
        id: userDetails != null ? userDetails?.establishmentId : "",
        published: isPublish,
      };
      publishEstablishment(payLoad);
    }
  }, [isPublish]);
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
          <Button
            variant="contained"
            size="large"
            color="primary"
            //  handle publish
            onClick={() => setIsPublish(true)}
            sx={{ textTransform: "none" }}
          >
            Publish
          </Button>
        </div>
      </section>
      <footer
        className="w-full px-4 flex justify-between items-center border-2 absolute bottom-0 bg-white"
        style={{ height: "10vh" }}
      >
        <Button
          variant="text"
          size="large"
          color="secondary"
          sx={{ textTransform: "none", fontWeight: "bold" }}
          onClick={() => setActiveStep((prevStep) => prevStep - 1)}
        >
          Back
        </Button>
      </footer>
    </>
  );
};

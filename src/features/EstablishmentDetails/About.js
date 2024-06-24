import React from "react";
import { SampleData } from "./SampleData";
import Box from "@mui/material/Box";
import {
  Grid,
  Card,
  CardContent,
  Rating,
  CardActions,
  Collapse,
  Button,
  CardHeader,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";
import GetIcon from "../../assets/Icon/icon";

function About(props) {
  const { establishmentEmployees, establishmentAbout, establishmentFeatures, establishmentLanguages, establishmentPaymentTypes } = props;

  const featureNames = [];

  // Check each key in the features object and add to featureNames if the value is true
  if (establishmentFeatures?.wheelchair) {
    featureNames.push('Wheel chair');
  }
  if (establishmentFeatures?.freewifi) {
    featureNames.push('Free wifi');
  }
  // Add more conditions for other possible features here

  // Join featureNames array with comma and space
  const displayText = featureNames.join(', ');

  const additionalInfos = ["Payment methods", "Languages", "Accessibility"];
  return (
    <div className="mx-16 my-10 md:w-8/12 sm:w-full" id="SearchDetailAbout">
      <div className="max-w-2xl">
        <div className="urbanist-font text-xl font-bold pb-2">About</div>
        <div className="urbanist-font text-lg font-normal">
          {establishmentAbout}
        </div>

        <div className="md:flex mt-4 rounded-3xl shadow-lg border overflow-hidden">
          <div className="inline  sm:w-full w-full">
            <div className="p-8">
              <div className="text-lg font-medium urbanist-font">
                Additional information
              </div>
              <div className="flex flex-wrap justify-between py-4">
                <div className="urbanist-font text-lg font-semibold w-full md:w-8/12">
                  <GetIcon
                    className="flex items-center h-fit gap-3"
                    iconName="PaymentCardIcon"
                    text="Payment methods"
                  />
                </div>
                <div className="w-full md:w-4/12 pl-8 md:pl-0">
                  {establishmentPaymentTypes?.map((item) => (
                    <div className="urbanist-font font-normal text-sm py-1">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <hr />

            <div className="flex flex-wrap justify-between py-4">
              <GetIcon
                  className="flex items-center gap-3 h-fit urbanist-font text-lg font-semibold w-full md:w-8/12"
                  iconName="PaymentCardIcon"
                  text="Payment methods"
                />
              <div className="w-full md:w-4/12 pl-8 md:pl-0">
                {establishmentLanguages?.map((item) => (
                  <div className="urbanist-font font-normal text-sm py-1">
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <hr />

              <div className="flex flex-wrap justify-between py-4">
                <GetIcon iconName='ManIcon' className="flex h-fit items-center gap-3 urbanist-font text-lg font-semibold w-full md:w-8/12" text='Accessibility'>
                  
                </GetIcon>
                <div className="w-full md:w-4/12 pl-8 md:pl-0">
                  
                    {featureNames?.map((item) => (
                  
                    <div className="urbanist-font font-normal text-sm py-1">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="custom-bg-light inline  sm:w-full w-full">
            <div className="p-8">
              <div className="text-lg font-bold pb-4">Our team</div>
              {establishmentEmployees?.map((item) => (
                <div className="flex py-2 gap-3 items-center">
                  <Avatar>
                    <img src={`/${item.imageId}`} />
                  </Avatar>
                  <div className="urbanist-font text-lg">
                    {item.employeeName}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;

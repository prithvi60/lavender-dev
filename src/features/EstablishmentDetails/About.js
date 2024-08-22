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
import Text from '../../components/Text';
import AvatarImg from "./AvatarImg";

function About(props) {
  const { establishmentId, establishmentEmployees, establishmentAbout, establishmentFeatures, establishmentLanguages, establishmentPaymentTypes } = props;

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
    <Box className="mx-16 my-10 scroll-mt-32 md:scroll-mt-20 md:w-8/12 sm:w-full" id="SearchDetailAbout" sx={{width: '85%', '@media (max-width: 640px)': {mx: 4}}}>
      <div className="max-w-2xl">
        <Text sx={styles.heading} name={"About"} align="left"/>
        <div className="text-lg font-normal urbanist-font">
          {establishmentAbout}
        </div>

        <div className="mt-4 overflow-hidden border shadow-lg md:flex rounded-3xl">
          <div className="w-full sm:w-full">
            <div className="p-4">
              <div className="text-lg font-bold urbanist-font">
                Additional information
              </div>
              <div className="py-4">
                <Box className="flex items-start md:gap-4 justify-between gap-0" sx={{'@media (max-width: 640px)': {flexDirection: 'column'}}}>
                  <Box sx={{display: 'flex', gap:"5px", alignItems: "start"}}>
                    <GetIcon
                      className="flex items-center mt-1"
                      iconName="PaymentCardIcon"
                    />
                    <Text name={"Payment method"} sx={styles.paymentText} />
                  </Box>
                  <div className="w-full pl-8 md:w-4/12 md:pl-0">
                    <div>
                      {establishmentPaymentTypes ? (
                        Object?.keys(establishmentPaymentTypes)?.map((item, index) => (
                          <Box key={index} className="py-1 text-sm font-normal urbanist-font" sx={{'@media (max-width: 640px)': {paddingLeft: 0}}}>
                            {item}
                          </Box>
                        ))
                      ) : (
                        <div>Payment types not added</div>
                      )}
                    </div>
                  </div>
                </Box>
              </div>
              <hr />

              <div className="py-4">
                <Box className="flex items-start md:gap-4 justify-between gap-0" sx={{'@media (max-width: 640px)': {flexDirection: 'column'}}}>
                  <Box sx={{display: 'flex', alignItems: "start", gap:"5px"}}>
                    <GetIcon
                        className="flex items-center w-full gap-3 text-lg font-semibold h-fit urbanist-font md:w-8/12"
                        iconName="LanguageIcon"
                      />
                    <Text name={"Languages"} sx={styles.text}/>
                  </Box>
                  <div className="w-full pl-8 md:w-4/12 md:pl-0">
                    {establishmentLanguages?.map((item) => (
                      <div className="py-1 text-sm font-normal urbanist-font">
                        {item}
                      </div>
                    ))}
                  </div>
                </Box>
              </div>
              <hr />

              <div className="py-4">
                <Box className="flex items-start gap-0 md:gap-4 justify-between" sx={{'@media (max-width: 640px)': {flexDirection: 'column'}}}>
                  <Box sx={{display: 'flex', alignItems: "start", gap:"5px"}}>
                    <GetIcon iconName='ManIcon' className="flex items-center gap-3 h-fit">
                    </GetIcon>
                    <Text name={"Accessibility"} sx={styles.textA}/>
                  </Box>
                  <div className="w-full pl-8 md:w-4/12 md:pl-0">
                    <div>
                      {establishmentFeatures ? (
                        Object?.keys(establishmentFeatures)?.map((item, index) => (
                          <div key={index} className="py-1 text-sm font-normal urbanist-font">
                            {item}
                          </div>
                        ))
                      ) : (
                        <div>Features not added</div>
                      )}
                    </div>
                  </div>
                </Box>
              </div>
            </div>
          </div>

          <div className="w-full custom-bg-light sm:w-full">
            <div className="p-8">
              <div className="pb-4 text-lg font-bold">Our team</div>
              {establishmentEmployees?.map((item) => (
                <div className="flex items-center gap-3 py-2">
                  <AvatarImg row={item?.profileImage} establishmentId={establishmentId}/>
                  <div className="text-lg urbanist-font">
                    {item?.employeeName}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
}

export default About;
const styles={
  heading: {
    color: '#333333',
    fontSize: '36px',
    fontWeight: 600,
  },
  text: {
    color: '#4D4D4D',
    fontSize: '18px',
    fontWeight: 700,
    // paddingRight: 14
  },
  textA: {
    color: '#4D4D4D',
    fontSize: '18px',
    fontWeight: 700,
    // paddingRight: 12.5
  },
  paymentText: {
    color: '#4D4D4D',
    fontSize: '18px',
    fontWeight: 700,
    whiteSpace: 'nowrap',
    alignContent: 'center',
  }
}
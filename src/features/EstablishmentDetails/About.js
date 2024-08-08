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
    <Box className="mx-16 my-10 md:w-8/12 sm:w-full" id="SearchDetailAbout" sx={{width: '85%', '@media (max-width: 640px)': {mx: 4}}}>
      <div className="max-w-2xl">
        <Text sx={styles.heading} name={"About"} align="left"/>
        <div className="urbanist-font text-lg font-normal">
          {establishmentAbout}
        </div>

        <div className="md:flex mt-4 rounded-3xl shadow-lg border overflow-hidden">
          <div className="sm:w-full w-full">
            <div className="p-4">
              <div className="text-lg font-bold urbanist-font">
                Additional information
              </div>
              <div className="flex flex-wrap justify-between py-4">
                <Box className=" flex mr-16" sx={{'@media (max-width: 640px)': {flexDirection: 'column'}}}>
                  <Box sx={{display: 'flex'}}>
                    <GetIcon
                      className="flex items-center"
                      iconName="PaymentCardIcon"
                    />
                    <Text name={"Payment method"} sx={styles.paymentText} />
                  </Box>
                  <div className="w-full md:w-4/12 pl-8 md:pl-0">
                    <div>
                      {establishmentPaymentTypes ? (
                        Object?.keys(establishmentPaymentTypes)?.map((item, index) => (
                          <Box key={index} className="urbanist-font font-normal text-sm py-1 pl-16" sx={{'@media (max-width: 640px)': {paddingLeft: 0}}}>
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

              <div className="flex flex-wrap justify-between py-4">
                <Box className="flex " sx={{'@media (max-width: 640px)': {flexDirection: 'column'}}}>
                  <Box sx={{display: 'flex'}}>
                    <GetIcon
                        className="flex items-center gap-3 h-fit urbanist-font text-lg font-semibold w-full md:w-8/12"
                        iconName="LanguageIcon"
                      />
                    <Text name={"Languages"} sx={styles.text}/>
                  </Box>
                  <div className="w-full md:w-4/12 pl-8 md:pl-0">
                    {establishmentLanguages?.map((item) => (
                      <div className="urbanist-font font-normal text-sm py-1">
                        {item}
                      </div>
                    ))}
                  </div>
                </Box>
              </div>
              <hr />

              <div className="flex flex-wrap justify-between py-4">
                <Box className="flex" sx={{'@media (max-width: 640px)': {flexDirection: 'column'}}}>
                  <Box sx={{display: 'flex'}}>
                    <GetIcon iconName='ManIcon' className="flex items-center gap-3 h-fit">
                    </GetIcon>
                    <Text name={"Accessibility"} sx={styles.textA}/>
                  </Box>
                  <div className="w-full md:w-4/12 pl-8 md:pl-0">
                    <div>
                      {establishmentFeatures ? (
                        Object?.keys(establishmentFeatures)?.map((item, index) => (
                          <div key={index} className="urbanist-font font-normal text-sm py-1">
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

          <div className="custom-bg-light  sm:w-full w-full">
            <div className="p-8">
              <div className="text-lg font-bold pb-4">Our team</div>
              {establishmentEmployees?.map((item) => (
                <div className="flex py-2 gap-3 items-center">
                  <AvatarImg row={item?.profileImage} establishmentId={establishmentId}/>
                  <div className="urbanist-font text-lg">
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
    paddingRight: 14
  },
  textA: {
    color: '#4D4D4D',
    fontSize: '18px',
    fontWeight: 700,
    paddingRight: 12.5
  },
  paymentText: {
    color: '#4D4D4D',
    fontSize: '18px',
    fontWeight: 700,
    whiteSpace: 'nowrap',
    alignContent: 'center',
  }
}
import React, {useState, useRef} from 'react'
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import { Divider } from '@mui/material';
import Text from '../../components/Text';
import {IconButton} from '@mui/material';
import GetIcon from '../../assets/Icon/icon';
import { useDispatch, useSelector } from "react-redux";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import OptionsModal from "./OptionsModal";
import OptionsModalListView from "./OptionsModalListView";

function ServiceListItems({ serviceCategories, handleClose }) {
  const listRef = useRef(null);
  const [value, setValue] = useState(0);
  const handleTabChange = (event, newValue) => {
    // Update the selected tab
    setValue(newValue);
    // Scroll to the top of the selected category
    const categoryRef = document.getElementById(`category-${newValue}`);
    if (categoryRef) {
      categoryRef.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  const checkOutList = useSelector((state) => state.checkOutPage);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div className="w-full urbanist-font">
      <div className={`flex gap-1 mb-2 items-center ${isMobile ? 'justify-center' : 'justify-start'}`}>
        <IconButton onClick={handleClose}>
          <GetIcon iconName="BackIconArrow" />
        </IconButton>
        <Text sx={styles.heading} name={"Services"} align="left" />
      </div>
      {/* <Tabs
      className='serviceTabs'
        value={value}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons
      >
        {serviceCategories?.map((service, index) => (
          <Tab key={index} label={service?.services[0]?.serviceTags} value={index} />
        ))}
      </Tabs> */}

      <List
        ref={listRef}
        className="serviceGridList"
        sx={{
          width: "100%",
          maxWidth: "100%",
          maxHeight: 1000,
          bgcolor: "background.paper",
          overflowY: "auto",
        }}
      >
        {serviceCategories?.map((item, index) => (
          <div key={index} id={`category-${index}`}>
            <Text
              sx={styles.subHeading}
              name={item?.categoryName}
              align="left"
            />

            {item?.services?.map((service, serviceIndex) => {
              debugger
              console.log("service : ", service)
              const checkoutOptionIds = checkOutList?.checkOut?.map(service => service.optionId);

              const matchingOptions = service?.options.filter(option => checkoutOptionIds.includes(option.optionId));

              const selectedService = matchingOptions?.map(option => option.optionId);

              <ListItemButton
                className="serviceList"
                sx={{
                  display: "flex",
                  justifyContent: isMobile ? "flex-start" : "space-between",
                  alignItems: "flex-start",
                  padding: isMobile ? "32px" : "16px",
                  position: "relative",
                  width: isMobile ? "100vw" : "100%",
                  maxWidth: isMobile ? "100%" : "100%",
                }}
                key={serviceIndex}
              >
                <div className={""}>
                  <Text
                    sx={styles.serviceName}
                    name={service?.serviceName}
                    align="left"
                  />
                  {service?.options?.length > 0 && (
                    <Text
                      sx={styles.duration}
                      name={`${service?.options[0]?.duration} mins`}
                      align="left"
                    />
                  )}
                  <Text
                    sx={{
                      ...styles.description,
                      overflowWrap: 'break-word',
                      wordWrap: 'break-word',
                      hyphens: 'auto',
                      maxWidth: '600px'
                    }}
                    name={service?.serviceDescription}
                    align="left"
                  />

                  <div className="text-base">
                    {service?.options?.length > 0 ? (
                      <span style={{ color: "#808080" }}>
                        from:{" "}
                        <span
                          className="font-bold"
                          style={{ color: "#4D4D4D", fontWeight: 700 }}
                        >
                          ${service.startingPrice}
                        </span>
                      </span>
                    ) : (
                      "$" +
                      <span className="font-bold">$service.finalPrice</span>
                    )}
                  </div>
                </div>
                {isMobile ? (
                  <div style={{ position: "absolute", right: 16, top: 36 }}>
                    <OptionsModalListView props={service} isMobile={isMobile} />
                  </div>
                ) : (
                  <div>
                    <OptionsModal props={service} isMobile={isMobile} selectedService={selectedService || []}/>
                  </div>
                )}
              </ListItemButton>
})}
            <Divider />
          </div>
        ))}
      </List>
    </div>
  );
}

export default ServiceListItems;

const styles = {
  heading: {
    color: "#000000",
    fontSize: "36px",
    fontWeight: 600,
  },
  subHeading: {
    color: "#4D4D4D",
    fontSize: "28px",
    fontWeight: 700,
    paddingLeft: 4,
    paddingTop: 1,
  },
  serviceName: {
    color: "#4D4D4D",
    fontSize: "20px",
    fontWeight: 600,
    py: "2px",
  },
  startingPrice: {
    color: "#4D4D4D",
    fontSize: "18px",
    fontWeight: 700,
    py: "2px",
  },
  duration: {
    color: "#808080",
    fontSize: "16px",
    fontWeight: 400,
    py: "2px",
  },
  description: {
    color: "#808080",
    fontSize: "16px",
    fontWeight: 400,
    py: "2px",
  },
  btn: {
    padding: "10px 40px 10px 40px",
    borderRadius: "10px",
  },
};

import React, { useState, useRef, useEffect } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import { Divider } from "@mui/material";
import Text from "../../components/Text";
import { IconButton } from "@mui/material";
import GetIcon from "../../assets/Icon/icon";
import { useDispatch, useSelector } from "react-redux";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import OptionsModal from "./OptionsModal";
import OptionsModalListView from "./OptionsModalListView";
import { updateCheckOut,resetCheckOut } from "../../store/slices/checkOutPageSlice";

function ServiceListItems({ serviceCategories, handleClose }) {
  const listRef = useRef(null);
  const [value, setValue] = useState(0);
  const [quickBookData, setQuickBookData] = useState();
  const [serviceCat, setServiceCat] = useState();
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
  const quickBook = useSelector((state) => state.quickBook);

  useEffect(()=>{
    setServiceCat(serviceCategories)
  },[serviceCategories])

  useEffect(()=>{
    setQuickBookData(quickBook)
  },[serviceCat])

  useEffect(()=>{
    if(quickBookData?.selectedServiceId && serviceCat?.length > 0){

      const filteredService = serviceCat
                              ?.flatMap(category => category?.services) // Flatten the services arrays
                              ?.filter(service => service?.serviceId === quickBook?.selectedServiceId); // Filter by serviceId
                              // ?.filter(category => category?.services?.length > 0);
      const option = filteredService[0]?.options[0];
      const isAlreadySelected = checkOutList?.checkOut?.some(
        (item) => item?.optionId === option?.optionId
      );

      if(filteredService?.length > 0 && !isAlreadySelected){
        handleServiceClick(filteredService[0])
      }
    }
  },[quickBookData, serviceCat])


  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();

  const handleServiceClick = (service) => {
    if (service?.options?.length === 1) {
      const option = service?.options[0];
      const isAlreadySelected = checkOutList?.checkOut?.some(
        (item) => item?.optionId === option?.optionId
      );
      if (isAlreadySelected) {
        dispatch(
          resetCheckOut({
            serviceId: service?.serviceId,
            optionId: option?.optionId,
          })
        );
      } else {
        dispatch(
          updateCheckOut({
            serviceId: service.serviceId,
            optionId: option.optionId,
            serviceName: option.optionName,
            finalPrice: option.salePrice,
            serviceDuration: option.duration,
          })
        );
      }
    }
  };
  
  return (
    <div className="w-full urbanist-font md:mx-24">
      <div className={`flex gap-1 mb-2 items-center`}>
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
          "@media (max-width: 768px)": {
            width: "100%",
          },
          maxHeight: { xs: "calc(100vh - 300px)", sm: "calc(100vh - 0px)" },
          bgcolor: "background.paper",
          overflowY: "auto",
          marginLeft: { xs: 0, md: "36px" },
          marginRight: { xs: 0, md: "38px" },
          "@media (min-width: 768px)": {
            width: "90%",
          },
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0,0,0,.2)",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "rgba(0,0,0,.1)",
          },
        }}
      >
        {serviceCategories?.map((item, index) => (
          <div key={index} id={`category-${index}`}>
            <Text
              sx={styles.subHeading}
              name={item?.categoryName}
              align="left"
              className=" md:!px-6"
            />

            {item?.services?.map((service, serviceIndex) => {
              const checkoutOptionIds = checkOutList?.checkOut?.map(
                (service) => service?.optionId
              );

              const matchingOptions = service?.options?.filter((option) =>
                checkoutOptionIds?.includes(option?.optionId)
              );

              const selectedService = matchingOptions?.map(
                (option) => option?.optionId
              );

              return (
                <ListItemButton
                  className="serviceList"
                  sx={{
                    display: "flex",
                    justifyContent: isMobile ? "flex-start" : "space-between",
                    alignItems: "flex-start",
                    // padding: isMobile ? "42px" : "16px",
                    position: "relative",
                    width: isMobile ? "100vw" : "100%",
                    maxWidth: isMobile ? "100%" : "100%",
                  }}
                  key={serviceIndex}
                >
                  <div className="py-3 md:px-[20px]">
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
                        overflowWrap: "break-word",
                        wordWrap: "break-word",
                        hyphens: "auto",
                        maxWidth: "600px",
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
    <OptionsModalListView
      props={service}
      isMobile={isMobile}
      onServiceClick={() => handleServiceClick(service)}
    />
  </div>
) : (
  <div>
    {service?.options?.length === 1 ? (
      <IconButton onClick={() => handleServiceClick(service)}>
        {checkOutList?.checkOut?.some(
          (item) => item?.optionId === service?.options[0]?.optionId
        ) ? (
          <GetIcon iconName="SelectedIcon" />
        ) : (
          <GetIcon iconName="PlusIcon" />
        )}
      </IconButton>
    ) : (
      <OptionsModal
        props={service}
        isMobile={isMobile}
        selectedService={selectedService || []}
        onServiceClick={() => handleServiceClick(service)}
      />
    )}
  </div>
)}
                </ListItemButton>
              );
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
    // paddingLeft: 4,
    // paddingTop: 1,
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

import React, { useEffect, useRef, useState } from "react";
import {
  CalendarHeaderComponent,
  Selector,
} from "../../Appointments/AppointmentControllers";
import StatusFilter from "../../../../components/FilterButtons";
import Divider from "@mui/material/Divider";
// import { Button } from "../../../../components/ui/button";
import { Button, InputAdornment } from "@mui/material";
import { useDrawer } from "../../BusinessDrawerContext";
import {
  addTime,
  getCurrentTime12HrFormat,
  getMonthAndDayNames,
  getTimeIntervals,
  range,
} from "../utils";
import {
  Autocomplete,
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { CustomTooltip } from "../../../../components/CustomTooltip";
import Text from "../../../../components/Text";
import endpoint from "../../../../api/endpoints";
import { useSelector } from "react-redux";
import { DeleteRounded } from "@mui/icons-material";
import ServiceSelector from "../../../../components/ServiceSelector";
import ClientSearchFilter from "../../../../components/SearchInputFilter";
import { SearchIcon } from "lucide-react";
import GetIcon from "../../../../assets/Icon/icon";

const clients = [
  {
    key: 1,
    value: [
      { name: "vamsi" },
      { phNumber: "999999122" },
      { mailId: "vamsitest@gamil.com" },
    ],
  },
  {
    key: 2,
    value: [
      { name: "mark" },
      { phNumber: "999999122" },
      { mailId: "amrktest@gamil.com" },
    ],
  },
  {
    key: 3,
    value: [
      { name: "andy" },
      { phNumber: "999999122" },
      { mailId: "andytest@gamil.com" },
    ],
  },
];

export default function NewAppointmentDrawer({ payload }) {
  const { closeDrawer } = useDrawer();
  const { date, employee, service, status, price, start } = payload;
  console.log("payload : ", payload);
  const [selectedTeamMember, setSelectedTeamMember] = useState(employee);
  // const [selectedClient, setClient] = useState(client || '');
  const [occuranceState, setOccuranceState] = useState("Doesn't repeat");
  const [startTime, setStartTime] = useState<any>(start);
  const [selectedDate, setSelectedDate] = useState(date);
  const [selectedBookingStatusFilters, setSelectedBookingStatusFilters] =
    useState([]);
  const [timeInterval, setTimeInterval] = useState(getTimeIntervals(start));
  const [categories, setCategories] = React.useState<any[]>([]);
  const [clients, setClients] = React.useState<[]>([]);
  const [filteredClients, setFilteredClients] = React.useState<any[]>([]);

  const userDetails = useSelector((state: any) => {
    return state?.currentUserDetails;
  });

  const establishmentId = userDetails?.establishmentId || "";

  useEffect(() => {
    // Filter and map data to include only the desired properties
    const result = clients?.map(({ customerId, fullName, emailAddress }) => ({
      customerId,
      fullName,
      emailAddress,
    }));

    // Update the filtered data state
    setFilteredClients(result);
  }, [clients]);

  useEffect(() => {
    const getEstablishmentDetails = async () => {
      try {
        const establishmentData = await endpoint.getEstablishmentDetailsById(
          establishmentId
        );
        if (establishmentData?.data?.success) {
          setCategories(establishmentData?.data?.data?.categories || []);
        }
      } catch (error) {
        console.error("Error fetching establishment details:", error);
      }
    };

    const getClientDetails = async () => {
      try {
        const clientDetails = await endpoint.getClientsList(establishmentId);
        if (clientDetails?.data?.success) {
          setClients(clientDetails?.data?.data?.content);
        }
      } catch (error) {
        console.error("Error fetching client details:", error);
      }
    };

    getEstablishmentDetails();
    getClientDetails();
  }, [establishmentId]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedServices, setSelectedServices] = useState<any>([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleServiceSelect = (event, value) => {
    if (
      value &&
      !selectedServices.some(
        (service) =>
          service.categories[0].services[0].options[0].optionId ===
          value.optionId
      )
    ) {
      const newService = {
        categories: [
          {
            services: [
              {
                serviceId: value.serviceId, // Include serviceId for identification
                serviceName: value.serviceName,
                options: [value], // Ensure the selected service is formatted correctly
              },
            ],
          },
        ],
      };
      setSelectedServices((prev) => [...prev, newService]);
    }
  };
  const handleDeleteService = (serviceId) => {
    setSelectedServices(
      selectedServices.filter((service) => service.serviceId !== serviceId)
    );
  };
  // Filter categories and services based on search term
  //  const filteredCategories = categories.filter(category =>
  //   category.services.some(service =>
  //     service.serviceName.toLowerCase().includes(searchTerm.toLowerCase())
  //   )
  // );

  // // Prepare options for Autocomplete
  // const options = filteredCategories.map(category => ({
  //   category: category.categoryName,
  //   services: category.services
  //     .filter(service =>
  //       service.serviceName.toLowerCase().includes(searchTerm.toLowerCase())
  //     )
  //     .map(service => service.serviceName)
  // }));

  const resetData = () => {
    setSelectedTeamMember("");
    //setClients("");
    setSelectedBookingStatusFilters([]);
    setSelectedDate(new Date(2024, 2, 21));
  };

  useEffect(() => {
    setStartTime(start);
    setSelectedDate(date);
    return () => {
      //resetData()
    };
  }, [payload]);

  const calculateTotals = (services) => {
    let totalSalePrice = 0;
    let totalDuration = 0;

    services.forEach((serviceCategory) => {
      serviceCategory.categories.forEach((category) => {
        category.services.forEach((service) => {
          service.options.forEach((option) => {
            totalSalePrice += option.salePrice || 0; // Handle case where salePrice might be null
            totalDuration += option.duration || 0; // Handle case where duration might be null
          });
        });
      });
    });

    return { totalSalePrice, totalDuration };
  };

  const handleFilterDrawerSubmit = async () => {
    const total = calculateTotals(selectedServices);
    const payLoad = {
      appointmentBooking: {
        establishmentId: establishmentId,
        id: "",
        createdDate: new Date(),
        createdBy: "",
        lastModifiedDate: new Date(),
        lastModifiedBy: "",
        customerId: selectedClient?.customerId,
        bookedBy: "",
        bookingTime: new Date(),
        totalDuration: total?.totalDuration,
        totalCost: total?.totalSalePrice,
        appointmentServices: [],
        paymentInfo: {
          payAtVenue: true,
          cardStoreId: "string",
          paymentStatus: "string",
          paymentTxnId: "string",
        },
      },
      currency: "USD",
      paymentMode: "ONLINE",
    };

    const appointmentServices =
      selectedServices &&
      selectedServices?.map((item) => ({
        serviceId: item?.categories[0]?.services[0]?.serviceId,
        optionId: item?.categories[0]?.services[0]?.options[0]?.optionId,
        serviceNotes: "",
        //employeeId: id,
        serviceCost: item?.categories[0]?.services[0]?.options[0]?.salePrice,
        bookingStatus: "confirmed",
        // startTime: modifiedStartTime,
        // endTime: modifiedEndTime,
        review: {
          serviceRating: 0,
          reviewDate: "",
          publicComments: "",
          privateComments: "",
        },
      }));
    // // Assign the dynamically populated appointmentServices to payload
    payLoad.appointmentBooking.appointmentServices = appointmentServices;

    // const appointmentBooking = await endpoint.makeCustomerSubscriptionInitiate(payLoad);
    const appointmentBooking = await endpoint.saveAppointmentBookings(payLoad);
    closeDrawer();
  };

  // const options = categories.flatMap(category =>
  //   category.services.map(service => ({
  //     ...service,
  //     categoryName: category?.categoryName
  //   }))
  // );

  // useEffect(()=>{
  //   handleServiceSelect()
  // },[selectedServices])
  return (
    <div className="flex-col h-full overflow-hidden">
      <div className="flex-col text-lg text-center p-4 mb-2 bg-[#1B1464] sticky top-0 z-[100]">
        <CustomTooltip
          placement="bottom"
          style={{ opacity: 1 }}
          title={
            <div className="shadow-xl">
              <CalendarHeaderComponent
                date={selectedDate}
                onChange={setSelectedDate}
              />
            </div>
          }
          children={
            <div className="text-white">
              {getMonthAndDayNames(selectedDate)}
            </div>
          }
          maxW={"95%"}
          arrowColor={""}
        />

        <div className="flex flex-row justify-around mt-3">
          <Selector
            onSelect={setStartTime}
            placeholder={startTime}
            options={timeInterval}
            // options={range(5).map((i,index) =>
            //   getCurrentTime12HrFormat(parseInt(startTime.split(':')[0]), index * 15)
            // )}
            className={" mb-4 shadow-lg rounded"}
          />
          {/* <CustomSelect/> */}
          <Selector
            onSelect={setOccuranceState}
            placeholder={occuranceState}
            options={[
              "Doesn't repeat",
              "Every day",
              "Every week",
              "Every month",
            ]}
            className={" mb-4 shadow-lg rounded"}
          />
        </div>
      </div>
      <div className="flex-col mx-1 px-4 overflow-hidden">
        {/* <SelectSeparator className='bg-black'/> */}
        {/* <Selector
          onSelect={setClients}
          placeholder={'Add client'}
          options={["vamsi", "mark", "andy"]}
          className={"w-full mb-4 rounded-lg"}
          label={"Client"}
        />
        <div>
          {clients}
        </div> */}

        <div style={{ width: 270 }}>
          <div className="p-2 font-bold">Client</div>
          <Autocomplete
            options={filteredClients}
            getOptionLabel={(option) =>
              `${option.fullName} (${option.emailAddress})`
            }
            onChange={(event, newValue) => {
              // Set the selected client
              setSelectedClient(newValue);
            }}
            sx={{
              "& .MuiAutocomplete-root .MuiAutocomplete-inputRoot": {
                padding: "4px !important",
              },
              "& .MuiOutlinedInput-root": {
                borderRadius: "9px",
                padding: "0px 8px",
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "transparent",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "transparent",
                },
              },
         
              "& .MuiInputBase-root": {
                fontSize:"14px",
                paddingRight: "8px !important", 
              },
            }}
            renderOption={(props, option) => (
              <ListItem {...props} divider>
                <ListItemText
                  primary={
                    <span style={{ color: "blue" }}>{option.fullName}</span>
                  }
                  secondary={option.emailAddress}
                />
                <Divider />
              </ListItem>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
            
                placeholder="Add Client"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <InputAdornment position="end">
                      <GetIcon iconName="Search"  />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
          {/* Display the card with selected client details */}
          {selectedClient && (
            <Card style={{ marginTop: 20 }}>
              <CardContent>
                <Typography variant="h6">{selectedClient.fullName}</Typography>
                <Typography color="textSecondary">
                  {selectedClient.emailAddress}
                </Typography>
              </CardContent>
            </Card>
          )}
        </div>

        <Divider />
        {/* 
        <Card sx={{ backgroundColor: '#E6E1FF', marginTop: '10px', marginBottom: '10px', width: 270 }}>
          <CardContent>
            <Box>
              <Text align="left" sx={{ color: '#4D4D4D', fontSize: '18px', fontWeight: 700 }} name={"Walkin"} />
              <Text align="left" sx={{ color: '#808080', fontSize: '16px', fontWeight: 400 }} name={"Default"} />
            </Box>
          </CardContent>
        </Card> */}
        <div className="bg-[#E6E1FF] relative rounded p-3 flex justify-between items-center mt-2">
          <div className="flex flex-col font-light">
            <div className="font-semibold">Walkin</div>
            {/* <div>{client.email}</div>
          <div>{client.phone ? client.phone : ''}</div> */}
          </div>
          <div
            className="cursor-pointer text-lg font-light"
            // onClick={() => { handler({ name: '', email: '', phone: '' }) }}
          >
            X
          </div>
        </div>
        <Divider />

        <div className="my-3" style={{ width: 270 }}>
          <ServiceSelector
            selectedServices={selectedServices}
            setSelectedServices={setSelectedServices}
            categories={categories}
          />
        </div>

        <Divider />
      </div>
      <div className="flex justify-center gap-5 w-full bg-white p-3.5 absolute bottom-0 ">
        {/* <Button
          onClick={resetData}
          sx={styles.txtBtn}
        >
          Reset
        </Button> */}
        <Button onClick={handleFilterDrawerSubmit} sx={styles.btn}>
          Done
        </Button>
      </div>
    </div>
  );
}

const styles = {
  btn: {
    color: "#FFFFFF",
    backgroundColor: "#825FFF",
    fontWeight: 600,
    fontSize: "16px",
    lineHeight: "24px",
    padding: "10px 40px 10px 40px",
    borderRadius: "10px",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#5A3EBF",
    },
  },
  txtBtn: {
    color: "#825FFF",
    fontWeight: 600,
    fontSize: "16px",
    lineHeight: "24px",
    textTransform: "none",
  },
  textField: {
    width: "272px",
    "& .MuiInputBase-root": {
      height: "55px", // Apply height to the input root
      borderRadius: "9px",
    },
  },
  select: {
    "& .MuiInputBase-root": {
      width: "272px !important",
      height: "55px",
      borderRadius: "9px",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderRadius: "9px",
    },
  },
};

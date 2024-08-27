import React, { useEffect, useState } from "react";
import { CalendarHeaderComponent, Selector } from "../../Appointments/AppointmentControllers";
import StatusFilter from "../../../../components/FilterButtons";
import Divider from "@mui/material/Divider";
// import { Button } from "../../../../components/ui/button";
import { Button, InputAdornment } from "@mui/material";
import { useDrawer } from "../../BusinessDrawerContext";
import { addTime, getCurrentTime12HrFormat, getMonthAndDayNames, getTimeIntervals, range } from "../utils";
import { Autocomplete, Box, Card, CardContent, Grid, IconButton, List, ListItem, ListItemText, TextField, Tooltip, Typography } from "@mui/material";
import { CustomTooltip } from "../../../../components/CustomTooltip";
import Text from "../../../../components/Text";
import endpoint from "../../../../api/endpoints";
import { useSelector } from "react-redux";
import { DeleteRounded } from "@mui/icons-material";
import ServiceSelector from "../../../../components/ServiceSelector";
import ClientSearchFilter from "../../../../components/SearchInputFilter";
import { SearchIcon } from "lucide-react";
import GetIcon from "../../../../assets/Icon/icon";

const clients = [{ key: 1, value: [{ name: 'vamsi' }, { phNumber: '999999122' }, { mailId: 'vamsitest@gamil.com' }] },
{ key: 2, value: [{ name: 'mark' }, { phNumber: '999999122' }, { mailId: 'amrktest@gamil.com' }] },
{ key: 3, value: [{ name: 'andy' }, { phNumber: '999999122' }, { mailId: 'andytest@gamil.com' }] },
]

export default function NewAppointmentDrawer({ payload }) {

  const { closeDrawer } = useDrawer();
  const { date, employee, service, status, price, start } = payload
  const [selectedTeamMember, setSelectedTeamMember] = useState(employee);
  // const [selectedClient, setClient] = useState(client || '');
  const [occuranceState, setOccuranceState] = useState("Doesn't repeat")
  const [startTime, setStartTime] = useState(start);
  const [selectedDate, setSelectedDate] = useState(date)
  const [selectedBookingStatusFilters, setSelectedBookingStatusFilters] = useState([]);
  const [timeInterval, setTimeInterval] = useState(getTimeIntervals(start))
  const [categories, setCategories] = React.useState<any[]>([]);
  const [clients, setClients] = React.useState<[]>([]);
  const [filteredClients, setFilteredClients] = React.useState<any[]>([]);

  console.log("clients :", JSON.stringify(clients))
  console.log("filteredClients :", JSON.stringify(filteredClients))


  const userDetails = useSelector((state: any) => {
    return state?.currentUserDetails;
  });

  const establishmentId = userDetails?.establishmentId || "";

  useEffect(()=>{
    // Filter and map data to include only the desired properties
    console.log("inside colors ; ", clients)
    const result = clients?.map(({ customerId, fullName, emailAddress }) => ({
      customerId,
      fullName,
      emailAddress
    }));
    
    // Update the filtered data state
    setFilteredClients(result);
  },[clients])

  useEffect(() => {
    const getEstablishmentDetails = async () => {
      try {
        const establishmentData = await endpoint.getEstablishmentDetailsById(establishmentId);
        if (establishmentData?.data?.success) {
          setCategories(establishmentData?.data?.data?.categories || []);
        }
      } catch (error) {
        console.error("Error fetching establishment details:", error);
      }
    };

    const getClientDetails = async () => {
      try{
        const clientDetails = await endpoint.getClientsList(establishmentId);
        if(clientDetails?.data?.success){
          setClients(clientDetails?.data?.data?.content)
        }
      }
      catch(error){
        console.error("Error fetching client details:", error);
      }
    }

    getEstablishmentDetails();
    getClientDetails();
  }, [establishmentId]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleServiceSelect = (event, value) => {
    if (value && !selectedServices.some(service => service.categories[0].services[0].options[0].optionId === value.optionId)) {
        const newService = {
            categories: [{
                services: [{
                    serviceId: value.serviceId, // Include serviceId for identification
                    serviceName: value.serviceName,
                    options: [value] // Ensure the selected service is formatted correctly
                }]
            }]
        };
        setSelectedServices(prev => [...prev, newService]);
    }
};
  const handleDeleteService = (serviceId) => {
    setSelectedServices(selectedServices.filter(service => service.serviceId !== serviceId));
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
    setSelectedDate(new Date(2024, 2, 21))
  };

  useEffect(() => {
    setStartTime(start)
    setSelectedDate(date)
    return () => {
      //resetData()
    }
  }, [payload])

  const serviceTagList = ['serv1', 'serv2']

  const handleFilterDrawerSubmit = () => {
    closeDrawer()
  };

  const options = categories.flatMap(category =>
    category.services.map(service => ({
      ...service,
      categoryName: category?.categoryName
    }))
  );

// useEffect(()=>{
//   handleServiceSelect()
// },[selectedServices])
  return (
    <div className="flex-col h-full overflow-hidden">
      <div className="flex-col text-lg text-center p-4 mb-2 bg-blue-950">
        <CustomTooltip
          placement="bottom" style={{ opacity: 1 }}
          title={
            <div className='shadow-xl'>
              <CalendarHeaderComponent date={selectedDate} onChange={setSelectedDate} />
            </div>
          }
          children={
            <div className="text-white">
              {getMonthAndDayNames(selectedDate)}
            </div>}
          maxW={"95%"} arrowColor={""}
        />

        <div className="flex flex-row justify-around mt-3">
          <Selector
            onSelect={setStartTime}
            placeholder={start}
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
            options={["Doesn't repeat", "Every day", "Every week", "Every month"]}
            className={" mb-4 shadow-lg rounded"}
          />
        </div>

      </div>
      <div className="flex-col mx-7">
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

<div style={{ width: 300 }}>
      <Autocomplete
        options={filteredClients}
        getOptionLabel={(option) => `${option.fullName} (${option.emailAddress})`}
        onChange={(event, newValue) => {
          // Set the selected client
          setSelectedClient(newValue);
        }}
        renderOption={(props, option) => (
          <ListItem {...props} divider>
            <ListItemText
              primary={<span style={{ color: 'blue' }}>{option.fullName}</span>}
              secondary={option.emailAddress}
            />
            <Divider />
          </ListItem>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Select customer"
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
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
            <Typography color="textSecondary">{selectedClient.emailAddress}</Typography>
          </CardContent>
        </Card>
      )}
    </div>

        <Divider />

        <Card sx={{ backgroundColor: '#E6E1FF', marginTop: '10px', marginBottom: '10px' }}>
          <CardContent>
            <Box>
              <Text align="left" sx={{ color: '#4D4D4D', fontSize: '18px', fontWeight: 700 }} name={"Walkin"} />
              <Text align="left" sx={{ color: '#808080', fontSize: '16px', fontWeight: 400 }} name={"Default"} />
            </Box>
          </CardContent>
        </Card>

        <Divider />
  

  <div className="my-3">
     <ServiceSelector 
      selectedServices={selectedServices} 
      setSelectedServices={setSelectedServices} 
      categories={categories} 
    />
        </div>
        {/* <Grid container spacing={2}>
          <Grid item xs={12}>
            <Autocomplete
              options={options}
              getOptionLabel={(option) => option.serviceName || ""}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  placeholder="Search services"
                  fullWidth
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              )}
              renderOption={(props, option) => (
                <li {...props}>
                  <Box>
                
                    <Typography variant="body1" fontWeight="bold">
                      {option.serviceName}
                    </Typography>
                    {option.options && option.options.length > 0 && (
                      <Box pl={2}>
                        {option.options.map((optionItem, index) => (
                          <Typography key={index} variant="body2">
                            - {optionItem.optionName} (${optionItem.salePrice.toFixed(2)})
                          </Typography>
                        ))}
                      </Box>
                    )}
                  </Box>
                </li>
              )}
              onChange={handleServiceSelect}
              groupBy={(option) => option.categoryName}  // Group by category name
            />
          </Grid>
        
          {selectedServices.map(service => (
            <Grid item xs={12} key={service.serviceId} className="max-h-40 h-full  overflow-y-auto">
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {service.serviceName}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Duration: {service.options.length > 0 ? `${service.options[0].duration} mins` : 'Not specified'}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Employee: {service.employees.length > 0 ? service.employees[0] : 'Not assigned'}
                  </Typography>
                  <IconButton onClick={() => handleDeleteService(service.serviceId)}>
                    <DeleteRounded />
                  </IconButton>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid> */}

        <Divider />

      </div>
      <div className="absolute bottom-0 flex justify-center gap-5 w-full bg-white p-3.5">
        <Button
          onClick={resetData}
          sx={styles.txtBtn}
        >
          Reset
        </Button>
        <Button onClick={handleFilterDrawerSubmit} sx={styles.btn}>
          Done
        </Button>
      </div>
    </div>
  );
}


const styles = {
  btn: {
    color: '#FFFFFF',
    backgroundColor: '#825FFF',
    fontWeight: 600,
    fontSize: '16px',
    lineHeight: '24px',
    padding: '10px 40px 10px 40px',
    borderRadius: '10px',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#5A3EBF',
    }
  },
  txtBtn: {
    color: '#825FFF',
    fontWeight: 600,
    fontSize: '16px',
    lineHeight: '24px',
    textTransform: 'none',
  },
  textField: {
    width: '272px',
    '& .MuiInputBase-root': {
      height: '55px', // Apply height to the input root
      borderRadius: '9px',
    },

  },
  select: {
    '& .MuiInputBase-root': {
      width: '272px !important',
      height: '55px',
      borderRadius: '9px',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderRadius: '9px',
    },
  },
}
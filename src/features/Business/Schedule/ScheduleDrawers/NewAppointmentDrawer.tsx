import React, { useEffect, useState } from "react";
import {
  CalendarHeaderComponent,
  Selector,
} from "../../Appointments/AppointmentControllers";
import StatusFilter from "../../../../components/FilterButtons";
import Divider from "@mui/material/Divider";
import { Button } from "../../../../components/ui/button";
import { useDrawer } from "../../BusinessDrawerContext";
import {
  addTime,
  getCurrentTime12HrFormat,
  getMonthAndDayNames,
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
// import CustomSelect from "../../../../components/ui/select";
import Text from "../../../../components/Text";
import endpoint from "../../../../api/endpoints";
import { useSelector } from "react-redux";
import { DeleteRounded } from "@mui/icons-material";

export default function NewAppointmentDrawer() {
  const { closeDrawer, payload } = useDrawer();

  const { date, client, employee, service, status, price, start } = payload;

  const [selectedTeamMember, setSelectedTeamMember] = useState(employee);
  const [selectedClient, setClient] = useState(client || "");
  const [occuranceState, setOccuranceState] = useState("Doesn't repeat");
  const [startTime, setStartTime] = useState(
    getCurrentTime12HrFormat(date.getHours(), date.getMinutes())
  );
  const [selectedDate, setSelectedDate] = useState(date);
  const [selectedBookingStatusFilters, setSelectedBookingStatusFilters] =
    useState([]);
  // const [timeInterval, setTimeInterval] = useState(getTimeIntervals(start))
  const [categories, setCategories] = React.useState<any[]>([]);

  const userDetails = useSelector((state: any) => {
    return state?.currentUserDetails;
  });

  const establishmentId = userDetails?.establishmentId || "";

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

    getEstablishmentDetails();
  }, [establishmentId]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedServices, setSelectedServices] = useState([]);

  const handleSearchChange = (event: any, value: any) => {
    setSearchTerm(value);
  };

  const handleServiceSelect = (event, value) => {
    if (
      value &&
      !selectedServices.find((service) => service.serviceId === value.serviceId)
    ) {
      setSelectedServices([...selectedServices, value]);
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
    setClient("");
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

  const serviceTagList = ["serv1", "serv2"];

  const handleFilterDrawerSubmit = () => {
    closeDrawer();
  };
  console.log("startTime : ", startTime);

  console.log("categories : ", categories);

  return (
    <div className="flex-col h-full">
      <div className="flex-col text-lg text-center p-4 mb-2 bg-blue-950">
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
            options={[
              "Doesn't repeat",
              "Every day",
              "Every week",
              "Every month",
            ]}
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
      <div className="flex-col mx-7">
        {/* <SelectSeparator className='bg-black'/> */}
        <Selector
          onSelect={setClient}
          placeholder={"Add client"}
          options={["vamsi", "mark", "andy"]}
          className={"w-full mb-4 rounded-lg"}
          label={"Client"}
        />
        <div>{client}</div>
        <Divider />

        <Card
          sx={{
            backgroundColor: "#E6E1FF",
            marginTop: "10px",
            marginBottom: "10px",
          }}
        >
          <CardContent>
            <Box>
              <Text
                align="left"
                sx={{ color: "#4D4D4D", fontSize: "18px", fontWeight: 700 }}
                name={"Walkin"}
              />
              <Text
                align="left"
                sx={{ color: "#808080", fontSize: "16px", fontWeight: 400 }}
                name={"Default"}
              />
            </Box>
          </CardContent>
        </Card>

        <Divider />

        {/* <Selector
          onSelect={setSelectedTeamMember}
          placeholder={"Add new service"}
          options={["Content", "bContent", "cContent", "dContent"]}
          className={"w-full mb-4 rounded-lg"}
          label={"Service"}
        /> */}

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Autocomplete
              options={categories.flatMap((category) => category.services)}
              getOptionLabel={(option) => option.serviceName}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search services"
                  variant="outlined"
                  fullWidth
                  value={searchTerm}
                  // onChange={handleSearchChange}
                />
              )}
              onChange={handleServiceSelect}
            />
          </Grid>
          {selectedServices.map((service) => (
            <Grid item xs={12} key={service.serviceId}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {service.serviceName}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Duration:{" "}
                    {service.options.length > 0
                      ? `${service.options[0].duration} mins`
                      : "Not specified"}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Employee:{" "}
                    {service.employees.length > 0
                      ? service.employees[0]
                      : "Not assigned"}
                  </Typography>
                  <IconButton
                    onClick={() => handleDeleteService(service.serviceId)}
                  >
                    <DeleteRounded />
                  </IconButton>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Divider />
      </div>
      <div className="my-4 mx-7">
        <Button
          onClick={resetData}
          className="mx-10"
          variant="ghost"
          color="#825FFF"
        >
          Reset
        </Button>
        <Button onClick={handleFilterDrawerSubmit}>Done</Button>
      </div>
    </div>
  );
}

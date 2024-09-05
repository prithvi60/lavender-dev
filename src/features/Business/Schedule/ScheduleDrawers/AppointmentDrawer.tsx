import React, { useEffect, useState } from "react";
import { CalendarHeaderComponent, Selector } from "../../Appointments/AppointmentControllers";
import StatusFilter from "../../../../components/FilterButtons";
import Divider from "@mui/material/Divider";
import { useDrawer } from "../../BusinessDrawerContext";
import { getCurrentTime12HrFormat, getMonthAndDayNames, range } from "../utils";
import { CustomTooltip } from "../../../../components/CustomTooltip";
import ClientSearchFilter from "../../../../components/SearchInputFilter";
import ServiceSelector from "../../../../components/ServiceSelector";
import { Button } from "@mui/material";

const categories = [
  {
      "categoryId": "CAT00002507",
      "categoryName": "Hair treatment",
      "serviceTag": "Hair coloring",
      "services": [
          {
              "serviceId": "SER00002514",
              "serviceName": "Women's Haircut",
              "serviceDescription": "Professional haircut and styling for women.",
              "gender": "F",
              "options": [
                  {
                      "optionId": "OPT00002532",
                      "optionName": "Basic Haircut",
                      "salePrice": 50,
                      "maxPrice": 60,
                      "discountPrice": 45,
                      "discountPercentage": 10,
                      "duration": 45
                  },
                  {
                      "optionId": "OPT00002533",
                      "optionName": "Haircut with Styling",
                      "salePrice": 70,
                      "maxPrice": 80,
                      "discountPrice": 63,
                      "discountPercentage": 10,
                      "duration": 60
                  }
              ],
              "startingPrice": 45,
              "employees": [
                  "E123",
                  "E1011234"
              ],
              "active": true
          },
          {
              "serviceId": "SER00002526",
              "serviceName": "test service",
              "serviceDescription": "test service",
              "gender": "M",
              "options": [
                  {
                      "optionId": "OPT00002553",
                      "optionName": "test service",
                      "salePrice": 123,
                      "maxPrice": null,
                      "discountPrice": null,
                      "discountPercentage": null,
                      "duration": 20
                  }
              ],
              "startingPrice": 123,
              "employees": [
                  "E123"
              ],
              "active": true
          },
          {
              "serviceId": "SER00002529",
              "serviceName": "test hair",
              "serviceDescription": "test hair",
              "gender": "M",
              "options": [
                  {
                      "optionId": "OPT00002556",
                      "optionName": "test hair",
                      "salePrice": 56,
                      "maxPrice": null,
                      "discountPrice": null,
                      "discountPercentage": null,
                      "duration": 30
                  }
              ],
              "startingPrice": 56,
              "employees": [
                  "EMP00002503"
              ],
              "active": true
          },
          {
              "serviceId": "SER00002530",
              "serviceName": "Hair dye",
              "serviceDescription": "Use henna",
              "gender": "M",
              "options": [
                  {
                      "optionId": "OPT00002557",
                      "optionName": "Hair dye",
                      "salePrice": 123,
                      "maxPrice": null,
                      "discountPrice": null,
                      "discountPercentage": null,
                      "duration": 30
                  }
              ],
              "startingPrice": 123,
              "employees": [
                  "EMP00002503"
              ],
              "active": true
          },
          {
              "serviceId": "SER00002531",
              "serviceName": "Hair dye",
              "serviceDescription": "Use henna",
              "gender": "M",
              "options": [
                  {
                      "optionId": "OPT00002558",
                      "optionName": "Hair dye",
                      "salePrice": 123,
                      "maxPrice": null,
                      "discountPrice": null,
                      "discountPercentage": null,
                      "duration": 30
                  }
              ],
              "startingPrice": 123,
              "employees": [
                  "EMP00002503"
              ],
              "active": true
          },
      ],
      "active": false
  },
  {
      "categoryId": "CAT00002508",
      "categoryName": "Nails",
      "serviceTag": "Nail",
      "services": [
          {
              "serviceId": "SER00002515",
              "serviceName": "Women's Nails",
              "serviceDescription": "Professional haircut and styling for women.",
              "gender": "F",
              "options": [
                  {
                      "optionId": "OPT00002534",
                      "optionName": "Basic nails",
                      "salePrice": 50,
                      "maxPrice": 60,
                      "discountPrice": 45,
                      "discountPercentage": 10,
                      "duration": 45
                  },
                  {
                      "optionId": "OPT00002535",
                      "optionName": "nils with Styling",
                      "salePrice": 70,
                      "maxPrice": 80,
                      "discountPrice": 63,
                      "discountPercentage": 10,
                      "duration": 60
                  }
              ],
              "startingPrice": 45,
              "employees": [
                  "E123",
                  "E1011234"
              ],
              "active": true
          }
      ],
      "active": false
  }
]

export default function AppointmentDrawer() {
  const { closeDrawer, payload } = useDrawer();
// payload needs to have full data of services
  const { date, client, employee, service, status, price, start } = payload
  const [selectedTeamMember, setSelectedTeamMember] = useState(employee);
  const [selectedClient, setSelectedClient ] = useState({name: client || 'Walk In', email: 'default', phone: ''})
  const [selectedServices, setSelectedServices] = useState([])
  const [occuranceState, setOccuranceState] = useState("Doesn't repeat")
  const [startTime, setStartTime] = useState(getCurrentTime12HrFormat(date.getHours(), date.getMinutes()));
  const [selectedDate, setSelectedDate] = useState(date)

  const dataObj = [
    { name: 'asd', phone: '+91 981184838', email: 'asd@gmail.com' },
    { name: 'qwe', phone: '+91 982284838', email: 'qwe@gmail.com' },
    { name: 'bnm', phone: '+91 983384838', email: 'bnm@gmail.com' },
    { name: 'fgh', phone: '+91 981184838', email: 'asd@gmail.com' },
    { name: 'jkl', phone: '+91 982284838', email: 'qwe@gmail.com' },
    { name: 'rty', phone: '+91 983384838', email: 'bnm@gmail.com' }
  ]

  const resetData = () => {
    setSelectedTeamMember("");
    setSelectedClient({
      name: '',
      email:'',
      phone: ''
    });
    setSelectedDate(new Date(2024, 2, 21))
  };

  useEffect(() => {
    setStartTime(getCurrentTime12HrFormat(date.getHours(), date.getMinutes()))
    setSelectedDate(date)
  }, [payload])


  const handleFilterDrawerSubmit = () => {
    closeDrawer()
  };
  // console.log("test",date, client, employee, service, status, price, start )
  useEffect(() => {
    const foundService = categories.flatMap(category => category.services)
      .find(serviceItem => serviceItem.serviceName === service);

    if (foundService) {
      // console.log("service test",foundService)
      const count = selectedServices.length;
      const payload = {
        id: "EST00002507" + count,
        categories: [
          {
            categoryId: foundService.categoryId, 
            services: [
              {
                ...foundService,
                options: foundService.options || [] 
              }
            ]
          }
        ]
      }
      setSelectedServices([payload]);
  }}, [service]);
  // console.log("services",payload,selectedServices)

  return (
    <div className="flex flex-col h-full relative overflow-y-hidden">
      <div className="flex flex-col text-lg text-center p-4 mb-2 bg-[#1B1464]">
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
            placeholder={startTime}
            options={range(5).map((i, index) =>
              getCurrentTime12HrFormat(parseInt(startTime.split(':')[0]), index * 15)
            )}
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

      <div className="block mx-3">
        {/* <SelectSeparator className='bg-black'/> */}
        <div className="mb-3">
          <ClientSearchFilter data={dataObj} client={selectedClient} handler={setSelectedClient}/>
        </div>

        <Divider />

        <div className="my-3">
          <ServiceSelector selectedServices={selectedServices} setSelectedServices={setSelectedServices} categories={categories}/>
        </div>
        
        {/* <Selector
          onSelect={setSelectedTeamMember}
          placeholder={"All Bookings"}
          options={["Content", "bContent", "cContent", "dContent"]}
          className={"w-full mb-4 shadow-lg rounded"}
          label={"Booked by"}
        /> */}
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
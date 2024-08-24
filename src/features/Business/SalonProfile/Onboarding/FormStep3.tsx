import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import {
  TextField,
  Typography,
  Button,
  Divider,
  FormControl,
  FormGroup,
  Checkbox,
  FormControlLabel,
  Collapse,
  List,
  ListItem,
  Select,
  MenuItem,
  Avatar,
  Badge,
  Card,
  CardContent,
  Grid,
  FormHelperText,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";
import { useDrawer } from "../../BusinessDrawerContext";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";
// Removed the import for endpoint from "../../../api/endpoints" due to the error
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useMutation } from "@tanstack/react-query";
import ImageUploading from "react-images-uploading";
import endpoint from "../../../../api/endpoints";
import { useSnackbar } from "../../../../components/Snackbar";
import Buttons from "../../../../components/Button";

interface ImageUploadResponse {
  data: {
    success: boolean;
    data: string;
  };
}

const schema = yup.object().shape({
  employeeId: yup.string(),
  employeeName: yup.string().required("Employee name is required"),
  startingDate: yup
    .mixed()
    .required("Starting date is required")
    .test("is-dayjs", "Invalid date format", (value) => dayjs.isDayjs(value)),
  email: yup.string().required(),
  accessLevel: yup.string(),
  services: yup.array().of(
    yup.object().shape({
      categoryId: yup.string().required(), // Ensure categoryId is required
      categoryName: yup.string().required(), // Ensure categoryName is required
      services: yup
        .array()
        .of(
          yup.object().shape({
            serviceId: yup.string().required(), // Ensure serviceID is required
            serviceName: yup.string().required(), // Ensure serviceName is required
          })
        )
        .required(), // Ensure services array is required
    })
  ),
  profileImage: yup.string(),
});

const AquaCheckbox = styled(Checkbox)(({ theme }) => ({
  "&.Mui-checked": {
    color: "#35AFAC",
  },
}));

export const FormStep3 = ({ setActiveStep }) => {
  const {
    register,
    control,
    watch,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      employeeName: "",
      startingDate: null,
      email: "",
      accessLevel: "",
      profileImage: "",
      services: [],
    },
  });

  const employeeId: any = null;

  const userDetails = useSelector((state: any) => state?.currentUserDetails);
  const establishmentId = userDetails?.establishmentId || "";
  const [formattedData, setFormattedData] = useState([]);
  const [employee, setEmployee] = useState([]);
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [currentEmployees, setCurrentEmployees] = useState<any>([]);

  // Update the formattedData when categories are fetched or when currentEmployees change
  useEffect(() => {
    const transformedData = categories.map((category) => ({
      ...category,
      isOpen: false,
      isSelected: false,
      services: category.services.map((service) => ({
        ...service,
        isSelected: false,
      })),
    }));
    setFormattedData(transformedData);
  }, [categories]);

  useEffect(() => {
    if (currentEmployees.length > 0) {
      const employeeServices = currentEmployees[0]?.services || [];
      const updatedFormattedData = formattedData.map((category) => {
        const servicesInCategory = employeeServices.filter(
          (service) => service.categoryId === category.categoryId
        );
        return {
          ...category,
          services: category.services.map((service) => ({
            ...service,
            isSelected: servicesInCategory.some(
              (empService) => empService.serviceId === service.serviceId
            ),
          })),
        };
      });
      setFormattedData(updatedFormattedData);
    }
  }, [currentEmployees]);
  const handleSave = async (data) => {
    // used to add servces
    const selectedData = formattedData
      .filter((category) =>
        category?.services?.some((service) => service?.isSelected)
      )
      .map((category) => ({
        categoryId: category?.categoryId,
        categoryName: category?.categoryName,
        services: category?.services
          .filter((service) => service?.isSelected)
          .map((service) => ({
            serviceId: service?.serviceId,
            serviceName: service?.serviceName,
          })),
      }));

    const payLoad = {
      id: "EST00002549",
      employees: [
        {
          employeeId: employeeId ? employeeId : "",
          employeeName: data?.employeeName,
          email: data?.email,
          startingDate: data?.startingDate
            ? data.startingDate.format("MM/DD/YYYY")
            : null,
          profileImage:
            // imageIdList?.length > 0 ? imageIdList[0] :
            data?.profileImage ? data?.profileImage : "",
          services: selectedData,
          accessLevel: data?.accessLevel,
        },
      ],
    };
    // console.log("team",data,payLoad);
    try {
      const response = await endpoint.saveEstablishmentEmployee(payLoad);
      if (response.data.success) {
        setActiveStep((prevStep) => prevStep + 1);
      } else {
        console.error("Error saving employee:", response.data.message);
        alert("There was an issue saving. Please try again.");
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      alert("An unexpected error occurred. Please try again.");
    }
    //   remove later
    setActiveStep((prevStep) => prevStep + 1);
  };

  const getEstablishmentDetails = async () => {
    try {
      const establishmentData = await endpoint.getEstablishmentDetailsById(
        establishmentId
      );
      if (establishmentData?.data?.success) {
        setEmployee(establishmentData?.data?.data?.employees || []);
        setCategories(establishmentData?.data?.data?.categories || []);
      }
    } catch (error) {
      console.error("Error fetching establishment details:", error);
    }
  };

  useEffect(() => {
    getEstablishmentDetails();
  }, []);
  useEffect(() => {
    if (employeeId) {
      setCurrentEmployees(
        employee?.filter((cat) => cat?.employeeId === employeeId)
      );
    }
  }, [employee, employeeId]);
  return (
    <>
      <form onSubmit={handleSubmit(handleSave)}>
        <section
          className="w-full flex justify-center items-center flex-1 overflow-y-auto mt-8"
          style={{ height: "80vh" }}
        >
          <div style={{ width: "60%", padding: "0px 20px" }}>
            <h5 className="text-sm mb-2.5">Step 3</h5>
            <h4 className="tetx-xl md:text-3xl tracking-wide mb-10">
              Add Team
            </h4>
            <div className="mb-4">
              <Typography
                sx={{ fontSize: "18px", fontWeight: "700", color: "#4D4D4D" }}
              >
                Employee name
              </Typography>
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "0.6rem",
                  },
                  "& input": {
                    padding: "16.5px 14px",
                  },
                }}
                {...register("employeeName")}
                error={!!errors.employeeName}
                helperText={errors.employeeName?.message}
              />
            </div>

            <div className="mb-4">
              <Typography
                sx={{ fontSize: "18px", fontWeight: "700", color: "#4D4D4D" }}
              >
                Email ID
              </Typography>
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "0.6rem",
                  },
                  "& input": {
                    padding: "16.5px 14px",
                  },
                }}
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </div>

            <div className="mb-4">
              {/* <Grid container spacing={1} sx={{ alignContent: "center" }}> */}
              <Typography
                sx={{ fontSize: "18px", fontWeight: "700", color: "#4D4D4D" }}
              >
                Access Level
              </Typography>
              <Controller
                name="accessLevel"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <FormControl error={!!errors.accessLevel} fullWidth>
                    <Select
                      {...field}
                      error={!!errors.accessLevel}
                      fullWidth
                      sx={{
                        borderRadius: "0.6rem", 
                      }}
                    >
                      <MenuItem value="Admin">Admin</MenuItem>
                      <MenuItem value="Employee">Employee</MenuItem>
                    </Select>
                    <FormHelperText>
                      {errors.accessLevel?.message}
                    </FormHelperText>
                  </FormControl>
                )}
              />
              {/* </Grid> */}
            </div>

            <div className="mb-4 flex flex-col">
              <Typography
                sx={{ fontSize: "18px", fontWeight: "700", color: "#4D4D4D" }}
              >
                Starting Date
              </Typography>
              <Controller
                name="startingDate"
                control={control}
                defaultValue={dayjs(new Date())}
                render={({ field }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      {...field}
                      value={field.value}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "0.6rem",
                        },
                      }}
                      onChange={(date) => field.onChange(date)}
                    />
                  </LocalizationProvider>
                )}
              />
              {errors.startingDate && (
                <Typography variant="caption" color="error" gutterBottom>
                  {errors.startingDate.message}
                </Typography>
              )}
            </div>
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

          <Buttons
            sx={{
              borderRadius: "10px",
              padding: "10px 40px 10px 40px",
              textTransform: "none",
              fontSize: "18px",
              fontWeight: 600,
              "@media (max-width: 600px)": {
                padding: "10px 20px 10px 20px",
                fontSize: "14px",
              },
            }}
            variant="contained"
            onClick={() => {
              setActiveStep((prevStep) => prevStep + 1);
            }}
            name={"Proceed"}
          >
            {" "}
          </Buttons>
        </footer>
      </form>
    </>
  );
};

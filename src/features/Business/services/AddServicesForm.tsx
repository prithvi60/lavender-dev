import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import {
  TextField,
  Divider,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Typography,
  FormHelperText,
  Grid,
  FormControlLabel,
  Switch,
  Checkbox,
} from "@mui/material";
import { Button } from "../../../components/ui/button";
import { useDrawer } from "../../../features/Business/BusinessDrawerContext";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import endpoint from "../../../api/endpoints";
import { useSelector } from "react-redux";

const schema = yup.object().shape({
  serviceName: yup.string().required(),
  serviceDescription: yup.string().required(),
  employees: yup.array().min(1, "Please select at least one employees").required(),
  gender: yup.string().required(),
  startingPrice: yup.string().required(),
  duration: yup.string().required(),
  categoryId: yup.string().required(),
  categoryName: yup.string(),
  options: yup.array().of(
    yup.object().shape({
      optionName: yup.string().required("Option name is required"),
      salePrice: yup.number().required("sale price is required"),
      maxPrice: null,
              discountPrice: null,
              discountPercentage: null,
      duration: yup.number().required("Option duration is required"),
    })
  ),
});


export default function AddServicesForm({payload}) {
  console.log("in add ser : ", payload)
  const {
    control,
    register,
    handleSubmit,
    setValue, // Added setValue from useForm
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [categories, setCategories] = React.useState<any[]>([]); // Update type accordingly
  const [employee, setEmployee] = React.useState<any[]>([]); // Update type accordingly
  const [currentCategories, setCurrentCategories] = useState([]);


  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });

  const { closeDrawer } = useDrawer();

  const userDetails = useSelector((state: any) => {
    return state?.currentUserDetails;
  });

  const establishmentId = userDetails?.establishmentId || "";


  useEffect(() => {
    const getEstablishmentDetails = async () => {
      try {
        const establishmentData = await endpoint.getEstablishmentDetailsById(establishmentId);
        if (establishmentData?.data?.success) {
          setCategories(establishmentData?.data?.data?.categories || []);
          setEmployee(establishmentData?.data?.data?.employees || []);

        }
      } catch (error) {
        console.error("Error fetching establishment details:", error);
      }
    };

    getEstablishmentDetails();
  }, [establishmentId]);
  
  const handleFilterDrawerSubmit = (data) => {
    // Adjust options based on serviceName, startingPrice, and duration if options are not entered
    if (!data.options || data.options.length === 0) {
      data.options = [
        {
          optionName: data.serviceName,
          salePrice: parseFloat(data.startingPrice) || 0,
          maxPrice: null,
              discountPrice: null,
              discountPercentage: null,
          duration: parseInt(data.duration) || 0,
        },
      ];
    }

    else {
      // Ensure all existing options have maxPrice, discountPrice, and discountPercentage fields
      data.options = data.options.map(option => ({
        ...option,
        maxPrice: null,
        discountPrice: null,
        discountPercentage: null,
      }));
    }
    

    const payload = {
      "id": establishmentId,
      "categories": [
        {
         "categoryId" : data.categoryId,
        "services": [{
        serviceName: data.serviceName,
        serviceDescription: data.serviceDescription,
        gender: data.gender,
        employees: data.employees,
        startingPrice: parseFloat(data.startingPrice) || 0,
        duration: parseInt(data.duration) || 0,
        options: data.options,
        active: true,  // Add active: true here
      }
    ]

    }
  ]
}
    const response = endpoint.saveEstablishmentService(payload);
    closeDrawer();

  };

  const addOption = () => {
    append({});
  };

  const removeOption = (index) => {
    remove(index);
  };

  useEffect(()=>{
    if(payload){
      
      setCurrentCategories(categories?.filter(cat => cat.categoryId === payload));
    }
  },[categories])

  useEffect(() => {
    if (payload) {
      setValue('categoryId', currentCategories[0]?.categoryId);
      setValue('categoryName', currentCategories[0]?.categoryName);
    }
  }, [currentCategories, setValue]);

  return (
    <div className="flex-col h-full">
      <form onSubmit={handleSubmit(handleFilterDrawerSubmit)}>
        <div className="bg-blue-950">
          <div className="text-lg h-14 mb-2 pt-4 pl-4 text-white">Add new service</div>
          <div className="mb-4 bg-white" style={{ width: "70%", borderRadius: "10px", marginLeft: '10px' }}>
            <Controller
              name="categoryId"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <FormControl error={!!errors.categoryId} fullWidth>
                  <Select {...field} error={!!errors.categoryId} fullWidth>
                    {categories?.map((item) => (
                      <MenuItem key={item.categoryId} value={item.categoryId}>
                        {item?.categoryName}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{errors.categoryId?.message}</FormHelperText>
                </FormControl>
              )}
            />
          </div>
        </div>
        <div className="p-4">
          <div className="mb-4">
            <Typography sx={{ fontSize: "18px", fontWeight: "700", color: "#4D4D4D" }}>
              Service name
            </Typography>
            <TextField fullWidth size="small" variant="outlined" {...register("serviceName")} />
            {errors.serviceName && (
              <p className="text-red-500 font-medium">{errors.serviceName.message}</p>
            )}
          </div>

          <div className="mb-4">
            <Typography sx={{ fontSize: "18px", fontWeight: "700", color: "#4D4D4D" }}>
              Service description
            </Typography>
            <TextField
              fullWidth
              size="small"
              variant="outlined"
              {...register("serviceDescription")}
            />
            {errors.serviceDescription && (
              <p className="text-red-500 font-medium">{errors.serviceDescription.message}</p>
            )}
          </div>

          <div className="mb-4">
            <Controller
              name="employees"
              control={control}
              defaultValue={[]}
              render={({ field }) => (
                <FormControl error={!!errors.employees} fullWidth>
                  <Typography sx={{ fontSize: "18px", fontWeight: "700", color: "#4D4D4D" }}>
                    employees
                  </Typography>
                  <Select
                    {...field}
                    label="employees"
                    multiple
                    error={!!errors.employees}
                    fullWidth
                    renderValue={(selected) => selected.join(", ")}
                  >
                    {employee?.map((emp) => (
                      <MenuItem key={emp.employeeId} value={emp.employeeId}>
                        <Checkbox checked={field.value.indexOf(emp.employeeId) > -1} />
                        {emp?.employeeName}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{errors.employees?.message}</FormHelperText>
                </FormControl>
              )}
            />
          </div>

          <div className="mb-4">
            <Controller
              name="gender"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <FormControl error={!!errors.gender} fullWidth>
                  <Typography sx={{ fontSize: "18px", fontWeight: "700", color: "#4D4D4D" }}>
                    Gender
                  </Typography>
                  <Select {...field} label="Gender" error={!!errors.gender} fullWidth>
                    <MenuItem value="M">Male</MenuItem>
                    <MenuItem value="F">Female</MenuItem>
                  </Select>
                  <FormHelperText>{errors.gender?.message}</FormHelperText>
                </FormControl>
              )}
            />
          </div>

          <Divider />

          <div className="mb-4">
            <Grid container spacing={2}>
              <Grid item xs={6} sx={{ alignContent: "end" }}>
                <Typography sx={{ fontSize: "18px", fontWeight: "700", color: "#4D4D4D" }}>
                  Price
                </Typography>
                <Controller
                  name="startingPrice"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <FormControl error={!!errors.startingPrice} fullWidth>
                      <TextField
                        {...field}
                        size="small"
                        variant="outlined"
                        error={!!errors.startingPrice}
                        fullWidth
                      />
                      <FormHelperText>{errors.startingPrice?.message}</FormHelperText>
                    </FormControl>
                  )}
                />
              </Grid>
            </Grid>
          </div>

          <div className="mb-4">
            <Grid container spacing={2} sx={{ alignContent: "end" }}>
              <Grid item xs={6} sx={{ alignContent: "end" }}>
                <Typography sx={{ fontSize: "18px", fontWeight: "700", color: "#4D4D4D" }}>
                  Duration
                </Typography>
                <Controller
                  name="duration"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <FormControl error={!!errors.duration} fullWidth>
                      <Select {...field} label="Duration Amount" error={!!errors.duration} fullWidth>
                        <MenuItem value="20">20</MenuItem>
                        <MenuItem value="30">30</MenuItem>
                      </Select>
                      <FormHelperText>{errors.duration?.message}</FormHelperText>
                    </FormControl>
                  )}
                />
              </Grid>
            </Grid>
          </div>

          {fields.map((option, index) => (
            <div key={option.id}>
              <Divider textAlign="left" sx={{ color: "#825FFF" }}>
                Option {index + 1}
              </Divider>
              <div className="mb-4">
                <Typography sx={{ fontSize: "18px", fontWeight: "700", color: "#4D4D4D" }}>
                  Option name
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  variant="outlined"
                  name={`options[${index}].optionName`}
                  />
                {errors?.options?.[index]?.optionName && (
                  <p className="text-red-500 font-medium">{errors.options[index].optionName.message}</p>
                )}
              </div>

              <div className="mb-4">
                <Grid container spacing={2}>
                  <Grid item xs={6}></Grid>
                  <Grid item xs={6} sx={{ alignContent: "end" }}>
                    <Controller
                      name={`options.${index}.salePrice`}
                      control={control}
                      render={({ field }) => (
                        <FormControl error={!!errors?.options?.[index]?.salePrice} fullWidth>
                          <TextField
                            {...field}
                            label="Amount"
                            size="small"
                            variant="outlined"
                            error={!!errors?.options?.[index]?.salePrice}
                            fullWidth
                          />
                          <FormHelperText>{errors?.options?.[index]?.salePrice?.message}</FormHelperText>
                        </FormControl>
                      )}
                    />
                  </Grid>
                </Grid>
              </div>

              <div className="mb-4">
                <Grid container spacing={2} sx={{ alignContent: "end" }}>
                  <Grid item xs={6}></Grid>
                  <Grid item xs={6} sx={{ alignContent: "end" }}>
                    <Controller
                      name={`options.${index}.duration`}
                      control={control}
                      render={({ field }) => (
                        <FormControl error={!!errors?.options?.[index]?.duration} fullWidth>
                          <Select
                            {...field}
                            label="Duration Amount"
                            error={!!errors?.options?.[index]?.duration}
                            fullWidth
                          >
                            <MenuItem value="20">20</MenuItem>
                            <MenuItem value="30">30</MenuItem>
                          </Select>
                          <FormHelperText>{errors?.options?.[index]?.duration?.message}</FormHelperText>
                        </FormControl>
                      )}
                    />
                  </Grid>
                </Grid>
              </div>

              <div className="mb-4">
                <Button variant="link" onClick={() => removeOption(index)}>
                  Remove Option
                </Button>
              </div>
            </div>
          ))}

          <div className="flex justify-center mt-4">
            <Button variant="link" onClick={addOption}>
              Add options [+]
            </Button>
          </div>

          <div className="flex justify-between mt-4">
            <Button onClick={closeDrawer} variant="ghost" style={{ color: "#825FFF" }}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

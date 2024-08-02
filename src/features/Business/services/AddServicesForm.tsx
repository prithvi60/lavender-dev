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
  Button
} from "@mui/material";
import { Button as UiButton} from "../../../components/ui/button";
import { useDrawer } from "../../../features/Business/BusinessDrawerContext";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import endpoint from "../../../api/endpoints";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { duration } from "moment";

const schema = yup.object().shape({
  serviceName: yup.string().required("Service name is required"),
  serviceDescription: yup.string().required("Service description is required"),
  employees: yup.array().min(1, "Please select at least one employees").required(),
  gender: yup.string().required("Gender is required"),
  startingPrice: yup.string().required("Starting price is required"),
  durationHours: yup.string().required("Duration hours is required"),
  durationMinutes: yup.string().required("Duration minutes is required"),
  categoryId: yup.string().required(),
  categoryName: yup.string().required("Category name is required"),
  options: yup.array().of(
    yup.object().shape({
      optionName: yup.string().required("Option name is required"),
      salePrice: yup.number().required("sale price is required"),
      maxPrice: null,
              discountPrice: null,
              discountPercentage: null,
      // duration: yup.number().required("Option duration is required"),
      durationHours: yup.string().required("Option duration hours is required"),
      durationMinutes: yup.string().required("Option duration minutes is required"),
    })
  ),
});

const AquaCheckbox = styled(Checkbox)(({ theme }) => ({
  '&.Mui-checked': {
    color: '#35AFAC', // Aqua color for tick mark
  },
}));

export default function AddServicesForm({payload}) {
  const {
    control,
    register,
    watch,
    handleSubmit,
    setValue, // Added setValue from useForm
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      durationHours: '',
      durationMinutes: '',
    },
  });

  const [categories, setCategories] = React.useState<any[]>([]); // Update type accordingly
  const [employee, setEmployee] = React.useState<any[]>([]); // Update type accordingly
  const [currentCategories, setCurrentCategories] = useState([]);


  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });

  const { closeDrawer } = useDrawer();
  const navigate = useNavigate()

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
    const totalMinutes = parseInt(data.durationHours, 10) * 60 + parseInt(data.durationMinutes, 10);



    // Adjust options based on serviceName, startingPrice, and duration if options are not entered
    if (!data.options || data.options.length === 0) {
      data.options = [
        {
          optionName: data.serviceName,
          salePrice: parseFloat(data.startingPrice) || 0,
          maxPrice: null,
              discountPrice: null,
              discountPercentage: null,
          duration: totalMinutes || 0,
        },
      ];
    }

    else {
      // Ensure all existing options have maxPrice, discountPrice, and discountPercentage fields
      data.options = data?.options?.map(option => ({
        ...option,
        duration: parseInt(option?.durationHours, 10) * 60 + parseInt(option?.durationMinutes, 10),
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
        duration: totalMinutes || 0,
        options: data.options,
        active: true,  // Add active: true here
      }
    ]

    }
  ]
    }
    mutation.mutate(payload)

  };

  const mutation = useMutation({
    mutationFn: (payload: any) => {
      return endpoint.saveEstablishmentService(payload);
    },
    onSuccess: (response: any) => {
      closeDrawer();
    },
    onError: (response: any) => {
      alert('login unsuccess')
    },
    onSettled: () => {}
      
})


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

  const [minuteOptions, setMinuteOptions] = useState([0, 15, 30, 45]);

  // Watch the durationHours field to update minuteOptions
  const durationHours = watch('durationHours');

  useEffect(() => {
    if (parseInt(durationHours) === 0) {
      // Exclude 0 minutes if 0 hours is selected
      setMinuteOptions([15, 30, 45]);
    } else {
      // Include all minute options if any other hour is selected
      setMinuteOptions([0, 15, 30, 45]);
    }
  }, [durationHours]);

  return (
    <div className="flex-col h-full">
      <form onSubmit={handleSubmit(handleFilterDrawerSubmit)}>
        <div className="bg-blue-950">
          <div className="text-xl h-14 mb-2 pt-4 pl-4 text-white font-bold">Add new service</div>
          <div className="mb-4 bg-white" style={{ width: "70%", borderRadius: "10px", marginLeft: '10px' }}>
            <Controller
              name="categoryId"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <FormControl error={!!errors.categoryId} fullWidth>
                  <Select {...field} error={!!errors.categoryId} fullWidth sx={styles.select}>
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
        <div className="px-4">
          <div className="mb-4">
            <Typography sx={{ fontSize: "18px", fontWeight: "700", color: "#4D4D4D" }}>
              Service name
            </Typography>
            <Controller
                name="serviceName"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <FormControl error={!!errors.serviceName} fullWidth>
                    <TextField
                      {...field}
                      size="small"
                      variant="outlined"
                      error={!!errors.serviceName}
                      fullWidth
                      sx={styles.textField}
                    />
                    <FormHelperText>{errors.serviceName?.message}</FormHelperText>
                  </FormControl>
                  )}
              />
          </div>

          <div className="mb-4">
            <Typography sx={{ fontSize: "18px", fontWeight: "700", color: "#4D4D4D" }}>
              Service description
            </Typography>

            <Controller
                  name="serviceDescription"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <FormControl error={!!errors.serviceDescription} fullWidth>
                      <TextField
                        {...field}
                        variant="outlined"
                        id="outlined-multiline-static"
                        placeholder="Elevate your style with our precision Haircut service. "
                        multiline
                        rows={3}
                        error={!!errors.serviceDescription}
                        fullWidth
                        sx={{width: '272px',
                          '& .MuiInputBase-root': {
                            borderRadius: '9px',
                          },}}
                      />
                      <FormHelperText>{errors.serviceDescription?.message}</FormHelperText>
                    </FormControl>
                  )}
                />
          </div>

          <div className="mb-4">
            <Controller
              name="employees"
              control={control}
              defaultValue={[]}
              render={({ field }) => (
                <FormControl error={!!errors.employees} fullWidth>
                  <Typography sx={{ fontSize: '18px', fontWeight: '700', color: '#4D4D4D' }}>
                    Employees
                  </Typography>
                  <Select
                    {...field}
                    multiple
                    error={!!errors.employees}
                    fullWidth
                    renderValue={(selected) => {
                      const selectedNames = employee
                        .filter((emp) => selected.includes(emp.employeeId))
                        .map((emp) => emp.employeeName)
                        .join(', ');
                      return selectedNames;
                    }}
                    sx={styles.select}
                  >
                    {employee.map((emp) => (
                      <MenuItem key={emp.employeeId} value={emp.employeeId}>
                        <AquaCheckbox
                          checked={field.value.includes(emp.employeeId)}
                          // No need to handle change here since `field` will manage value
                        />
                        {emp.employeeName}
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
                  <Select {...field}  error={!!errors.gender} fullWidth sx={styles.select}>
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
              <Grid item xs={12} sx={{ alignContent: "end" }}>
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
                        sx={styles.textField}
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
              <Grid item xs={12} sx={{ alignContent: "end" }}>
                <Typography sx={{ fontSize: "18px", fontWeight: "700", color: "#4D4D4D" }}>
                  Duration
                </Typography>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <Controller
                      name="durationHours"
                      control={control}
                      render={({ field }) => (
                        <FormControl fullWidth error={!!errors.durationHours}>
                          <Select {...field} displayEmpty sx={styles.select}>
                            {Array.from({ length: 9 }, (_, i) => (
                              <MenuItem key={i} value={i}>{i} hour</MenuItem>
                            ))}
                          </Select>
                          <FormHelperText>{errors.durationHours?.message}</FormHelperText>
                        </FormControl>
                      )}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Controller
                      name="durationMinutes"
                      control={control}
                      render={({ field }) => (
                        <FormControl fullWidth error={!!errors?.durationMinutes}>
                          <Select {...field} displayEmpty sx={styles.select}>
                          {minuteOptions.map(min => (
                          <MenuItem key={min} value={min}>{min} minutes</MenuItem>
                        ))}
                          </Select>
                          <FormHelperText>{errors.durationMinutes?.message}</FormHelperText>
                        </FormControl>
                      )}
                    />
                  </Grid>
                </Grid>
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
                sx={styles.textField}
                  fullWidth
                  size="small"
                  variant="outlined"
                  {...register(`options.${index}.optionName`)}
                />
                {errors?.options?.[index]?.optionName && (
                  <p className="text-red-500 font-medium">{errors.options[index].optionName.message}</p>
                )}
              </div>

              <div className="mb-4">
                <Grid container spacing={2}>
                  <Grid item xs={12} sx={{ alignContent: "end" }}>
                  <Typography sx={{ fontSize: "18px", fontWeight: "700", color: "#4D4D4D" }}>
                    Price
                  </Typography>
                    <Controller
                      name={`options.${index}.salePrice`}
                      control={control}
                      render={({ field }) => (
                        <FormControl error={!!errors?.options?.[index]?.salePrice} fullWidth>
                          <TextField
                            sx={styles.textField}
                            {...field}
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
                  <Grid item xs={12} sx={{ alignContent: "end" }}>
                    {/* <Controller
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
                    /> */}
                    <Typography sx={{ fontSize: "18px", fontWeight: "700", color: "#4D4D4D" }}>
                        Duration
                      </Typography>
                    <Grid container spacing={1}>
                      
                      <Grid item xs={6}>
                        <Controller
                          name={`options.${index}.durationHours`}
                          control={control}
                          render={({ field }) => (
                            <FormControl fullWidth error={!!errors?.options?.[index]?.durationHours}>
                              <Select {...field} displayEmpty sx={styles.select}>
                                {Array.from({ length: 9 }, (_, i) => (
                                  <MenuItem key={i} value={i}>{i} hour</MenuItem>
                                ))}
                              </Select>
                              <FormHelperText>{errors?.options?.[index]?.durationHours?.message}</FormHelperText>
                            </FormControl>
                          )}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Controller
                          name={`options.${index}.durationMinutes`}
                          control={control}
                          render={({ field }) => (
                            <FormControl fullWidth error={!!errors?.options?.[index]?.durationMinutes}>
                              <Select {...field} displayEmpty sx={styles.select}>
                              {minuteOptions.map(min => (
                              <MenuItem key={min} value={min}>{min} minutes</MenuItem>
                            ))}
                              </Select>
                              <FormHelperText>{errors?.options?.[index]?.durationMinutes?.message}</FormHelperText>
                            </FormControl>
                          )}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </div>

              <div className="mb-4">
                <UiButton variant="link" onClick={() => removeOption(index)}>
                  Remove Option
                </UiButton>
              </div>
            </div>
          ))}

          <div className="flex justify-center mt-4" >
            <UiButton variant="link" onClick={addOption} style={{color: '#808080 !important'}}>
              Add options [+]
            </UiButton>
          </div>

          <div className="flex justify-between mt-4">
            <Button onClick={closeDrawer} sx={styles.txtBtn}>
              Cancel
            </Button>
            <Button type="submit" sx={styles.btn}>Save</Button>
          </div>
        </div>
      </form>
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
import React, { useState } from "react";
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
  Link,
} from "@mui/material";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import editIcon from "../../../assets/editbtn.svg";
import { Button } from "../../../components/ui/button";
import { useDrawer } from "../../../features/Business/BusinessDrawerContext";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import endpoint from "../../../api/endpoints";


const schema = yup.object().shape({
  serviceName: yup.string().required(),
  serviceDescription: yup.string().required(),
  employee: yup.string().required(),
  gender: yup.string().required(),
  priceType: yup.string().required(),
  price: yup.string().required(),
  durationType: yup.string().required(),
  duration: yup.string().required(),
  extraTime: yup.boolean(), // Changed to boolean for the toggle
  category: yup.string(),
  optionName: yup.string(),
  priceOptType: yup.string(),
  durationOptType: yup.string(),
  priceOpt: yup.number().when('$optionName', {
    is: (optionName, schema) => optionName === 'selectedOptionName',
    then: yup.number().required('Price is required').positive('Price must be a positive number'),
    otherwise: yup.number(),
  }),
  durationOpt: yup.string().when('$optionName', {
    is: (optionName: string, schema) => optionName === 'selectedOptionName',
    then: yup.string().required('Duration is required'),
    otherwise: yup.string(),
  }),
});

const employeeList = [
  { name: "Richard", value: "Richard" },
  { name: "Stanley", value: "Stanley" },
];

const categoryList = [
    { name: "Hair styling", value: "Hair styling" },
    { name: "Nail", value: "Nail" },
  ];

export default function AddServicesForm() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });


  const [addOptions, setAddOptions] = useState(false);

  const { closeDrawer } = useDrawer();

  const handleFilterDrawerSubmit = (data) => {
    console.log("faatad : ", data)
    alert(JSON.stringify(data, null, 2));
    const payLoad = {
      "id": "EST00002500",
      "categories": [
        {
          "categoryId" : "CAT00002500",
          "services": [
            {
              "serviceName": "Women's Haircut",
              "serviceDescription": "Professional haircut and styling for women.",
              "gender": "F",
              "employees": ["E123", "E1011234"],
              "options": [
                {
                  "optionName": "",
                  "salePrice": "",
                  "maxPrice": "",
                  "duration": ""
                },
              ],
              "duration": 40,
              "startingPrice": 45.00,
              "active": true
            }
          ]
        }
      ]
    }
    const response = endpoint.saveEstablishmentService(payLoad);
  };

  return (
    <div className="flex-col h-full">
      <form onSubmit={handleSubmit(handleFilterDrawerSubmit)}>
        <div style={{backgroundColor: '#1B1464', paddingLeft: '20px', paddingTop: '20px'}}>
            <div className="pb-2">
            <Typography
              
              sx={{ fontSize: "18px", fontWeight: "700", color: "white" }}
            >
              Add new service
            </Typography>
            </div>
            <div className="mb-4 text-white pb-4">
              <Controller
                name="category"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <FormControl error={!!errors.category} fullWidth>
                    <Select
                    sx={{backgroundColor: 'white', width: '60%', height: '45px', borderRadius: '10px'}}
                      {...field}
                      error={!!errors.category}
                      fullWidth
                    >
                      {categoryList.map((item) => (
                        <MenuItem key={item.value} value={item.value}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>{errors.category?.message}</FormHelperText>
                  </FormControl>
                )}
              />
            </div>
        </div>
        
        <div className="flex-col h-full p-4">
          <div className="mb-4">
            <Typography
              
              sx={{ fontSize: "18px", fontWeight: "700", color: "#4D4D4D" }}
            >
              Service name
            </Typography>
            <TextField  fullWidth size="small" variant="outlined" {...register("serviceName")} />
            {errors.serviceName && (
              <p className="text-red-500 font-medium">{errors.serviceName.message}</p>
            )}
          </div>

          <div className="mb-4">
            <Typography
              
              sx={{ fontSize: "18px", fontWeight: "700", color: "#4D4D4D" }}
            >
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
              name="employee"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <FormControl error={!!errors.employee} fullWidth>
                  <Typography
                    
                    sx={{ fontSize: "18px", fontWeight: "700", color: "#4D4D4D" }}
                  >
                    Employee
                  </Typography>
                  <Select
                  sx={{height: '50px'}}
                    {...field}
                    error={!!errors.employee}
                    fullWidth
                  >
                    {employeeList.map((emp) => (
                      <MenuItem key={emp.value} value={emp.value}>
                        {emp.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{errors.employee?.message}</FormHelperText>
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
                  <Typography
                    
                    sx={{ fontSize: "18px", fontWeight: "700", color: "#4D4D4D" }}
                  >
                    Gender
                  </Typography>
                  <Select
                  sx={{height: '50px'}}
                    {...field}
                    error={!!errors.gender}
                    fullWidth
                  >
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
              <Grid item xs={6}>
                <Controller
                  name="priceType"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <FormControl error={!!errors.priceType} fullWidth>
                      <Typography
                        
                        sx={{ fontSize: "18px", fontWeight: "700", color: "#4D4D4D" }}
                      >
                        Price
                      </Typography>
                      <Select
                      sx={{height: '50px'}}
                        {...field}
                        error={!!errors.priceType}
                        fullWidth
                      >
                        <MenuItem value="Fixed">Fixed</MenuItem>
                        <MenuItem value="From">From</MenuItem>
                      </Select>
                      <FormHelperText>{errors.priceType?.message}</FormHelperText>
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid item xs={6} sx={{alignContent: 'end'}}>
                <Controller
                  name="price"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <FormControl  error={!!errors.price} fullWidth>
                      <TextField
                        {...field}
                        size="small"
                        variant="outlined"
                        error={!!errors.price}
                        fullWidth
                      />
                      <FormHelperText>{errors.price?.message}</FormHelperText>
                    </FormControl>
                  )}
                />
              </Grid>
            </Grid>
          </div>

          <div className="mb-4">
            <Grid container spacing={2} sx={{alignContent: 'end'}}>
              <Grid item xs={6}>
                <Controller
                  name="durationType"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <FormControl error={!!errors.durationType} fullWidth>
                      <Typography
                        
                        sx={{ fontSize: "18px", fontWeight: "700", color: "#4D4D4D" }}
                      >
                        Duration
                      </Typography>
                      <Select
                        sx={{height: '50px'}}
                        {...field}
                        error={!!errors.durationType}
                        fullWidth
                      >
                        <MenuItem value="Fixed">Fixed</MenuItem>
                        <MenuItem value="Varies">Varies</MenuItem>
                      </Select>
                      <FormHelperText>{errors.durationType?.message}</FormHelperText>
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid item xs={6} sx={{alignContent: 'end'}}>
                <Controller
                  name="duration"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <FormControl error={!!errors.duration} fullWidth>
                      <Select
                        sx={{height: '50px'}}
                        {...field}
                        error={!!errors.duration}
                        fullWidth
                      >
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

          <div className="mb-4">
            <FormControlLabel
              control={
                <Switch
                  {...register("extraTime")}
                  color="success"
                  checked={true} // Should be connected to form state
                />
              }
              label="Extra time"
              labelPlacement="start"
              sx={{color: '#4D4D4D', fontSize: '18px', fontWeight: '700'}}
            />
          </div>

          {
              addOptions && 
              <div>
                  <Divider textAlign="left" sx={{color: '#825FFF'}}>Option 1</Divider>
                  <div className="mb-4">
                      <Typography sx={{ fontSize: "18px", fontWeight: "700", color: "#4D4D4D" }}>Option name</Typography>
                      <TextField fullWidth size="small" variant="outlined" {...register("optionName")} />
                          {errors.optionName && (
                              <p className="text-red-500 font-medium">{errors.optionName.message}</p>
                          )}
                  </div>

                  <div className="mb-4">
                      <Grid container spacing={2}>
                          <Grid item xs={6}>
                          <Controller
                              name="priceOptType"
                              control={control}
                              defaultValue=""
                              render={({ field }) => (
                              <FormControl error={!!errors.priceOptType} fullWidth>
                                  <Typography
                                  
                                  sx={{ fontSize: "18px", fontWeight: "700", color: "#4D4D4D" }}
                                  >
                                  Price
                                  </Typography>
                                  <Select
                                  sx={{height: '50px'}}
                                  {...field}
                                  error={!!errors.priceOptType}
                                  fullWidth
                                  >
                                  <MenuItem value="Fixed">Fixed</MenuItem>
                                  <MenuItem value="From">From</MenuItem>
                                  </Select>
                                  <FormHelperText>{errors.priceOptType?.message}</FormHelperText>
                              </FormControl>
                              )}
                          />
                          </Grid>
                          <Grid item xs={6} sx={{alignContent: 'end'}}>
                          <Controller
                              name="priceOpt"
                              control={control}
                              defaultValue=""
                              render={({ field }) => (
                              <FormControl  error={!!errors.priceOpt} fullWidth>
                                  <TextField
                                  {...field}
                                  label="Amount"
                                  size="small"
                                  variant="outlined"
                                  error={!!errors.priceOpt}
                                  fullWidth
                                  />
                                  <FormHelperText>{errors.priceOpt?.message}</FormHelperText>
                              </FormControl>
                              )}
                          />
                          </Grid>
                      </Grid>
                  </div>

                  <div className="mb-4">
                      <Grid container spacing={2} sx={{alignContent: 'end'}}>
                          <Grid item xs={6}>
                          <Controller
                              name="durationOptType"
                              control={control}
                              defaultValue=""
                              render={({ field }) => (
                              <FormControl error={!!errors.durationOptType} fullWidth>
                                  <Typography
                                  
                                  sx={{ fontSize: "18px", fontWeight: "700", color: "#4D4D4D" }}
                                  >
                                  Duration
                                  </Typography>
                                  <Select
                                  sx={{height: '50px'}}
                                  {...field}
                                  error={!!errors.durationOptType}
                                  fullWidth
                                  >
                                  <MenuItem value="Fixed">Fixed</MenuItem>
                                  <MenuItem value="Varies">Varies</MenuItem>
                                  </Select>
                                  <FormHelperText>{errors.durationOptType?.message}</FormHelperText>
                              </FormControl>
                              )}
                          />
                          </Grid>
                          <Grid item xs={6} sx={{alignContent: 'end'}}>
                          <Controller
                              name="durationOpt"
                              control={control}
                              defaultValue=""
                              render={({ field }) => (
                              <FormControl error={!!errors.durationOpt} fullWidth>
                                  <Select
                                  sx={{height: '50px'}}
                                  {...field}
                                  error={!!errors.durationOpt}
                                  fullWidth
                                  >
                                  <MenuItem value="20">20</MenuItem>
                                  <MenuItem value="30">30</MenuItem>
                                  </Select>
                                  <FormHelperText>{errors.durationOpt?.message}</FormHelperText>
                              </FormControl>
                              )}
                          />
                          </Grid>
                      </Grid>
                  </div>
              </div>
          }

          <div className="flex justify-center mt-4">
              <Link
                sx={{cursor: 'pointer'}}
                variant="body2"
                onClick={() => {
                  setAddOptions(true)
                }}
              >
              Add options [+]
              </Link>
          </div>

          <div className="flex justify-between mt-4">
            <Button
              onClick={closeDrawer}
              variant="ghost"
              style={{ color: "#825FFF" }}
            >
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>

        </div>

        
      </form>
    </div>
  );
}

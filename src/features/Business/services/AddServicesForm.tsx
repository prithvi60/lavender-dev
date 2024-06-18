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
  price: yup.string().required(),
  duration: yup.string().required(),
  extraTime: yup.boolean(), // Changed to boolean for the toggle
  category: yup.string(),
  optionName: yup.string(),
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

  const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 22,
    height: 22,
    border: `2px solid ${theme.palette.background.paper}`,
  }));

  const [addOptions, setAddOptions] = useState(false);

  const { closeDrawer } = useDrawer();

  const handleFilterDrawerSubmit = (data) => {
    console.log("faatad : ", data)
    alert(JSON.stringify(data, null, 2));
    const response = endpoint.saveEstablishmentService(payLoad);
  };

  return (
    <div className="flex-col h-full p-4">
      <form onSubmit={handleSubmit(handleFilterDrawerSubmit)}>
        <div className="bg-blue-950">
            <div className="text-lg h-14 mb-2 text-white">
            Add new service
            </div>
            <div className="mb-4 text-white">
          <Controller
            name="category"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <FormControl error={!!errors.category} fullWidth>
                <Select
                sx={{backgroundColor: 'white'}}
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
        
        

        <div className="mb-4">
          <Typography
            
            sx={{ fontSize: "18px", fontWeight: "700", color: "#4D4D4D" }}
          >
            Service name
          </Typography>
          <TextField fullWidth size="small" variant="outlined" {...register("serviceName")} />
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
                  {...field}
                  label="Employee"
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
                  {...field}
                  label="Gender"
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
                name="price"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <FormControl error={!!errors.price} fullWidth>
                    <Typography
                      
                      sx={{ fontSize: "18px", fontWeight: "700", color: "#4D4D4D" }}
                    >
                      Price
                    </Typography>
                    <Select
                      {...field}
                      label="Price"
                      error={!!errors.price}
                      fullWidth
                    >
                      <MenuItem value="Fixed">Fixed</MenuItem>
                      <MenuItem value="From">From</MenuItem>
                    </Select>
                    <FormHelperText>{errors.price?.message}</FormHelperText>
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
                      label="Amount"
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
                name="duration"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <FormControl error={!!errors.duration} fullWidth>
                    <Typography
                      
                      sx={{ fontSize: "18px", fontWeight: "700", color: "#4D4D4D" }}
                    >
                      Duration
                    </Typography>
                    <Select
                      {...field}
                      label="Duration Type"
                      error={!!errors.duration}
                      fullWidth
                    >
                      <MenuItem value="Fixed">Fixed</MenuItem>
                      <MenuItem value="Varies">Varies</MenuItem>
                    </Select>
                    <FormHelperText>{errors.duration?.message}</FormHelperText>
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
                      {...field}
                      label="Duration Amount"
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
                            name="price"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                            <FormControl error={!!errors.price} fullWidth>
                                <Typography
                                
                                sx={{ fontSize: "18px", fontWeight: "700", color: "#4D4D4D" }}
                                >
                                Price
                                </Typography>
                                <Select
                                {...field}
                                label="Price"
                                error={!!errors.price}
                                fullWidth
                                >
                                <MenuItem value="Fixed">Fixed</MenuItem>
                                <MenuItem value="From">From</MenuItem>
                                </Select>
                                <FormHelperText>{errors.price?.message}</FormHelperText>
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
                                label="Amount"
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
                            name="duration"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                            <FormControl error={!!errors.duration} fullWidth>
                                <Typography
                                
                                sx={{ fontSize: "18px", fontWeight: "700", color: "#4D4D4D" }}
                                >
                                Duration
                                </Typography>
                                <Select
                                {...field}
                                label="Duration Type"
                                error={!!errors.duration}
                                fullWidth
                                >
                                <MenuItem value="Fixed">Fixed</MenuItem>
                                <MenuItem value="Varies">Varies</MenuItem>
                                </Select>
                                <FormHelperText>{errors.duration?.message}</FormHelperText>
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
                                {...field}
                                label="Duration Amount"
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
            </div>
        }

        <div className="flex justify-center mt-4">
          <Button variant='link' onClick={()=>{setAddOptions(true)}}>Add options [+]</Button>
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
      </form>
    </div>
  );
}

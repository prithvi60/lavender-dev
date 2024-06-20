import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  TextField,
  Divider,
  MenuItem,
  FormControl,
  Select,
  Typography,
  FormHelperText,
  Grid,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { Button } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  serviceName: yup.string().required(),
  serviceDescription: yup.string().required(),
  employee: yup.string().required(),
  gender: yup.string().required(),
  price: yup.string().when('hasOptions', {
    is: true,
    then: yup.string().required('Price is required when adding options'),
    otherwise: yup.string(),
  }),
  duration: yup.string().when('hasOptions', {
    is: true,
    then: yup.string().required('Duration is required when adding options'),
    otherwise: yup.string(),
  }),
  optionName: yup.string(),
  salePrice: yup.number().when('hasOptions', {
    is: true,
    then: yup.number().required('Sale price is required when adding options'),
    otherwise: yup.number(),
  }),
  maxPrice: yup.number().when('hasOptions', {
    is: true,
    then: yup.number().required('Max price is required when adding options'),
    otherwise: yup.number(),
  }),
  discountPrice: yup.number().when('hasOptions', {
    is: true,
    then: yup.number().required('Discount price is required when adding options'),
    otherwise: yup.number(),
  }),
  discountPercentage: yup.number().when('hasOptions', {
    is: true,
    then: yup.number().required('Discount percentage is required when adding options'),
    otherwise: yup.number(),
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
    watch,
    setValue
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      hasOptions: false, // New state to track if options are added
    },
  });

  const [addOptions, setAddOptions] = useState(false);

  const handleFilterDrawerSubmit = (data) => {
    // Prepare the payload based on whether options are added or not
    const payload = {
      categoryId: "CAT00002500",
      services: [
        {
          serviceName: data.serviceName,
          serviceDescription: data.serviceDescription,
          gender: data.gender,
          price: data.price,
          duration: data.duration,
          options: data.hasOptions
            ? [
                {
                  optionName: data.optionName,
                  salePrice: parseFloat(data.salePrice),
                  maxPrice: parseFloat(data.maxPrice),
                  discountPrice: parseFloat(data.discountPrice),
                  discountPercentage: parseInt(data.discountPercentage),
                  duration: parseInt(data.durationAmount),
                },
                // Add more options here if needed
              ]
            : [],
          startingPrice: parseFloat(data.priceAmount),
          active: true,
        },
      ],
    };

    console.log("Payload: ", payload);
    alert(JSON.stringify(payload, null, 2));
    // Implement API call or further processing with the payload
  };

  return (
    <div className="flex-col h-full p-4">
      <form onSubmit={handleSubmit(handleFilterDrawerSubmit)}>
        <div className="bg-blue-950">
          <div className="text-lg h-14 mb-2 text-white">Add new service</div>
          <div className="mb-4 text-white">
            <Controller
              name="category"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <FormControl error={!!errors.category} fullWidth>
                  <Select
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
          <Typography sx={{ fontSize: "18px", fontWeight: "700", color: "#4D4D4D" }}>
            Service name
          </Typography>
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            {...register("serviceName")}
          />
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
            name="employee"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <FormControl error={!!errors.employee} fullWidth>
                <Typography sx={{ fontSize: "18px", fontWeight: "700", color: "#4D4D4D" }}>
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
                <Typography sx={{ fontSize: "18px", fontWeight: "700", color: "#4D4D4D" }}>
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
                    <Typography sx={{ fontSize: "18px", fontWeight: "700", color: "#4D4D4D" }}>
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
            <Grid item xs={6}>
              <Controller
                name="priceAmount"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Amount"
                    size="small"
                    variant="outlined"
                    error={!!errors.priceAmount}
                    fullWidth
                  />
                )}
              />
            </Grid>
          </Grid>
        </div>

        <div className="mb-4">
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Controller
                name="duration"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <FormControl error={!!errors.duration} fullWidth>
                    <Typography sx={{ fontSize: "18px", fontWeight: "700", color: "#4D4D4D" }}>
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
            <Grid item xs={6}>
              <Controller
                name="durationAmount"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Duration Amount"
                    size="small"
                    variant="outlined"
                    error={!!errors.durationAmount}
                    fullWidth
                  />
                )}
              />
            </Grid>
          </Grid>
        </div>

        <div className="mb-4">
          <FormControlLabel
            control={
              <Switch
                checked={addOptions}
                onChange={(e) => {
                  setAddOptions(e.target.checked);
                  setValue("hasOptions", e.target.checked);
                }}
                name="addOptions"
                color="primary"
              />
            }
            label="Add options"
          />
        </div>

        {addOptions && (
          <div>
            <Divider />
            <div className="mb-4">
              <Typography sx={{ fontSize: "18px", fontWeight: "700", color: "#4D4D4D" }}>
                Option Name
              </Typography>
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                {...register("optionName", { required: true })}
              />
              {errors.optionName && (
                <p className="text-red-500 font-medium">{errors.optionName.message}</p>
              )}
            </div>

            <div className="mb-4">
              <Typography sx={{ fontSize: "18px", fontWeight: "700", color: "#4D4D4D" }}>
                Sale Price
              </Typography>
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                {...register("salePrice", { required: true })}
              />
              {errors.salePrice && (
                <p className="text-red-500 font-medium">{errors.salePrice.message}</p>
              )}
            </div>

            <div className="mb-4">
              <Typography sx={{ fontSize: "18px", fontWeight: "700", color: "#4D4D4D" }}>
                Max Price
              </Typography>
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                {...register("maxPrice", { required: true })}
              />
              {errors.maxPrice && (
                <p className="text-red-500 font-medium">{errors.maxPrice.message}</p>
              )}
            </div>

            <div className="mb-4">
              <Typography sx={{ fontSize: "18px", fontWeight: "700", color: "#4D4D4D" }}>
                Discount Price
              </Typography>
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                {...register("discountPrice", { required: true })}
              />
              {errors.discountPrice && (
                <p className="text-red-500 font-medium">{errors.discountPrice.message}</p>
              )}
            </div>

            <div className="mb-4">
              <Typography sx={{ fontSize: "18px", fontWeight: "700", color: "#4D4D4D" }}>
                Discount Percentage
              </Typography>
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                {...register("discountPercentage", { required: true })}
              />
              {errors.discountPercentage && (
                <p className="text-red-500 font-medium">{errors.discountPercentage.message}</p>
              )}
            </div>
          </div>
        )}

        <div className="mt-4">
          <Button variant="contained" type="submit">Save</Button>
        </div>
      </form>
    </div>
  );
}

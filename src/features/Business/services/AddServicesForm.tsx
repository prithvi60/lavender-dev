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
  Checkbox,
} from "@mui/material";
import { Button } from "../../../components/ui/button";
import { useDrawer } from "../../../features/Business/BusinessDrawerContext";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import endpoint from "../../../api/endpoints";

const schema = yup.object().shape({
  serviceName: yup.string().required(),
  serviceDescription: yup.string().required(),
  employee: yup.array().min(1, "Please select at least one employee").required(),
  gender: yup.string().required(),
  price: yup.string().required(),
  duration: yup.string().required(),
  category: yup.string(),
  options: yup.array().of(
    yup.object().shape({
      optionName: yup.string().required("Option name is required"),
      optionPrice: yup.number().required("Option price is required"),
      optionDuration: yup.number().required("Option duration is required"),
    })
  ),
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
    setValue, // Added setValue from useForm
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });

  const { closeDrawer } = useDrawer();

  const handleFilterDrawerSubmit = (data) => {
    // Adjust options based on serviceName, price, and duration if options are not entered
    if (!data.options || data.options.length === 0) {
      data.options = [
        {
          optionName: data.serviceName,
          optionPrice: parseFloat(data.price) || 0,
          optionDuration: parseInt(data.duration) || 0,
        },
      ];
    }

    alert(JSON.stringify(data, null, 2));
    const response = endpoint.saveEstablishmentService(data);
  };

  const addOption = () => {
    append({});
  };

  const removeOption = (index) => {
    remove(index);
  };

  return (
    <div className="flex-col h-full">
      <form onSubmit={handleSubmit(handleFilterDrawerSubmit)}>
        <div className="bg-blue-950">
          <div className="text-lg h-14 mb-2 text-white">Add new service</div>
          <div className="mb-4 bg-white" style={{ width: "70%", borderRadius: "10px" }}>
            <Controller
              name="category"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <FormControl error={!!errors.category} fullWidth>
                  <Select {...field} error={!!errors.category} fullWidth>
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
              name="employee"
              control={control}
              defaultValue={[]}
              render={({ field }) => (
                <FormControl error={!!errors.employee} fullWidth>
                  <Typography sx={{ fontSize: "18px", fontWeight: "700", color: "#4D4D4D" }}>
                    Employee
                  </Typography>
                  <Select
                    {...field}
                    label="Employee"
                    multiple
                    error={!!errors.employee}
                    fullWidth
                    renderValue={(selected) => selected.join(", ")}
                  >
                    {employeeList.map((emp) => (
                      <MenuItem key={emp.value} value={emp.value}>
                        <Checkbox checked={field.value.indexOf(emp.value) > -1} />
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
                  name="price"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <FormControl error={!!errors.price} fullWidth>
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
                  {...register(`options[${index}].optionName`)}
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
                      name={`options[${index}].optionPrice`}
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <FormControl error={!!errors?.options?.[index]?.optionPrice} fullWidth>
                          <TextField
                            {...field}
                            label="Amount"
                            size="small"
                            variant="outlined"
                            error={!!errors?.options?.[index]?.optionPrice}
                            fullWidth
                          />
                          <FormHelperText>{errors?.options?.[index]?.optionPrice?.message}</FormHelperText>
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
                      name={`options[${index}].optionDuration`}
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <FormControl error={!!errors?.options?.[index]?.optionDuration} fullWidth>
                          <Select
                            {...field}
                            label="Duration Amount"
                            error={!!errors?.options?.[index]?.optionDuration}
                            fullWidth
                          >
                            <MenuItem value="20">20</MenuItem>
                            <MenuItem value="30">30</MenuItem>
                          </Select>
                          <FormHelperText>{errors?.options?.[index]?.optionDuration?.message}</FormHelperText>
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

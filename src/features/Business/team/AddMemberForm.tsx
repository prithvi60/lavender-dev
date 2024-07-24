import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import {
  TextField,
  Typography,
  Button,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";
import { useDrawer } from "../BusinessDrawerContext";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';
import endpoint from "../../../api/endpoints";

const schema = yup.object().shape({
  employeeName: yup.string().required("Employee name is required"),
  startingDate: yup.date().nullable().required("Starting date is required"),
});

export default function AddMemberForm({ payload }) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      employeeName: '',
      startingDate: new Date(),
    },
  });
  const { closeDrawer } = useDrawer();
  
  const [value, setValue] = React.useState<Dayjs | null>(null);

  const userDetails = useSelector((state: any) => state?.currentUserDetails);
  const establishmentId = userDetails?.establishmentId || "";

  const handleDrawerSubmit = (data) => {
    

    const payLoad = {
        "id": establishmentId,
        "employees": [
            {
             "employeeId": "",
              "employeeName": data.employeeName,
              "startingDate": data.startingDate ? data.startingDate?.toLocaleDateString('en-GB') : null,
              "profileImage": "ESI00002606"
            },
          ],
    }

    const response = endpoint.saveEstablishmentEmployee(payLoad);
    closeDrawer();

  };



  return (
    <div className="flex-col h-full">
      <form onSubmit={handleSubmit(handleDrawerSubmit)}>
        <div style={{ backgroundColor: '#1B1464' }}>
          <div className="text-lg h-14 mb-2 p-4 text-white">
            {payload ? "Edit new Member" : "Add new Member"}

          </div>
        </div>

        <div className="flex-col h-full p-4">
          <div className="mb-4">
            <Typography sx={{ fontSize: "18px", fontWeight: "700", color: "#4D4D4D" }}>
              Employee name
            </Typography>
            <TextField
              fullWidth
              size="small"
              variant="outlined"
              {...register("employeeName")}
              error={!!errors.employeeName}
              helperText={errors.employeeName?.message}
            />
          </div>

          <div className="mb-4">
            <Typography sx={{ fontSize: "18px", fontWeight: "700", color: "#4D4D4D" }}>
              Starting Date
            </Typography>
            <Controller
              name="startingDate"
              control={control}
              defaultValue={new Date()}
              render={({ field }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker {...field} value={value} onChange={(date) => field.onChange(date)} sx={{ width: '100%' }} />
                </LocalizationProvider>
              )}
            />
            {errors.startingDate && (
              <Typography variant="caption" color="error" gutterBottom>
                {errors.startingDate.message}
              </Typography>
            )}
          </div>

          <div className="flex justify-between mt-4">
            <Button onClick={closeDrawer} style={{ color: "#825FFF" }}>
              Cancel
            </Button>
            <Button type="submit">Add</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

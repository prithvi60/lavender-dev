import React, {Fragment, useState} from 'react';
import { TextareaAutosize } from '@mui/base';
import {
  Grid,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox
} from '@mui/material';

import '../index.css';
import { Dropdown } from '../../../../components/Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { addEmployee } from '../../../../store/slices/adminPageSlice';
import { Button } from '../../../../components/Button';
import ImageUploader from '../../../../components/ImageUploader';

const FORM_VALUES = [
    {xs: 12, sm: 12, type: "textField", id: "name", label: "Name", autoComplete: "name", variant: "standard", required: true},
    {xs: 12, sm: 12, type: "select", id: "designation", label: "Designation", autoComplete: "designation", variant: "standard", required: true, options: ["Manager", "Supervisor", "Assistant", "Hairstylist"], placeholder: "Select designation"},
    {xs: 12, sm: 12, type: "select", id: "status", label: "Status", autoComplete: "status", variant: "standard", required: true, options: ["Active", "InActive"], placeholder: "Select status"},
]

const EmployeeForm = () => {
    const { employees } = useSelector((state) => state.adminPage);

    const dispatch = useDispatch();

    const [employee, setEmployee] = useState({
        id: employees.length + 1,
        name: "",
        designation: "",
        status: "",
        image: ""
    });

    const handleOnChange = (key, value) => {
        const employeeTemp = {...employee};
        employeeTemp[key] = value;
        setEmployee(employeeTemp);
    }

    const handleAddEmployee = () => {
        // You can implement your logic to add a new employee here
        // For demonstration purposes, let's just add a new employee with dummy data
        dispatch(addEmployee({ employee }));
      };

    return (
        <Fragment>
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography>{"Add New Employee"}</Typography>
            </Grid>
            {FORM_VALUES?.map((item, index) => {
                switch (item?.type) {
                    case "textField":
                        return (
                            <Grid key={index} item xs={item?.xs} sm={item?.sm} className="b-grid">
                                <TextField
                                    required={item?.required}
                                    id={item?.id}
                                    name={item?.id}
                                    label={item?.label}
                                    fullWidth
                                    autoComplete={item?.autoComplete}
                                    variant={item?.variant}
                                    onChange={(e) => handleOnChange(item?.id, e.target.value)}
                                    value={employee?.[item?.id]}
                                />
                            </Grid>
                        )
                    case "select":
                        return (
                            <Grid key={index} item xs={item?.xs} sm={item?.sm} className="b-grid">
                                <Dropdown
                                    value={employee?.[item?.id]}
                                    onChange={(e) => handleOnChange(item?.id, e.target.value)}
                                    options={item?.options}
                                    placeholder={item?.placeholder}
                                />
                            </Grid>
                        )
                    default:
                        return null;

                }

            })}
            <Grid item xs={12}>
                <ImageUploader />
                <Button
                    onClick={handleAddEmployee}
                    name={"Submit"}
                    sx={{ mt: 3, ml: 1 }}
                />
            </Grid>
        </Grid>
        
        </Fragment>
    );
}

export default EmployeeForm;
import React, {Fragment, useEffect, useState} from 'react';
import {
  Grid,
  Typography,
  TextField,
} from '@mui/material';

import { Dropdown } from '../../../components/Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { addEmployee, editEmployee, updateEmployee } from '../../../store/slices/admin/employeeAdminSlice';
import { Button } from '../../../components/Button';
import ImageUploader from '../../../components/ImageUploader';

const FORM_VALUES = [
    {xs: 12, sm: 12, type: "textField", id: "name", label: "Name", autoComplete: "name", variant: "outlined", required: true},
    {xs: 12, sm: 12, type: "select", id: "designation", label: "Designation", autoComplete: "designation", variant: "outlined", required: true, options: ["Manager", "Supervisor", "Assistant", "Hairstylist"], placeholder: "Select designation"},
    {xs: 12, sm: 12, type: "select", id: "status", label: "Status", autoComplete: "status", variant: "outlined", required: true, options: ["Active", "InActive"], placeholder: "Select status"},
]

const EmployeeForm = () => {
    const { employees, editEmployeeId } = useSelector((state) => state.employeeAdmin);

    const dispatch = useDispatch();

    const initialState = {
        id: Math.floor(Math.random() * 1000) + 1,
        name: "",
        designation: "",
        status: "",
        image: ""
    };

    const [employee, setEmployee] = useState({...initialState});

    const handleOnChange = (key, value) => {
        const employeeTemp = {...employee};
        employeeTemp[key] = value;
        setEmployee(employeeTemp);
    }

    const handleAddEmployee = () => {
        if (editEmployeeId) {
            dispatch(updateEmployee({ employee }));
        } else {
            dispatch(addEmployee({ employee }));
        }
        
        setEmployee({...initialState});
        dispatch(editEmployee({editEmployeeId: null}));
    };

    useEffect(() => {
        if (editEmployeeId) {
            const employeeTemp = employees?.filter(item => item?.id === editEmployeeId)?.[0];
            if (employeeTemp) {
                setEmployee({...employeeTemp})
            }
            
        }
    }, [editEmployeeId, employees])

    return (
        <Fragment>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography>{`${editEmployeeId ? "Edit" : "Add"} New Employee`}</Typography>
                </Grid>
                {FORM_VALUES?.map((item, index) => {
                    switch (item?.type) {
                        case "textField":
                            return (
                                <Grid key={index} item xs={item?.xs} sm={item?.sm} className="grid">
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
                                <Grid key={index} item xs={item?.xs} sm={item?.sm} className="grid">
                                    <Dropdown
                                        value={employee?.[item?.id]}
                                        onChange={(e) => handleOnChange(item?.id, e.target.value)}
                                        options={item?.options}
                                        placeholder={item?.placeholder}
                                        required={item?.required}
                                    />
                                </Grid>
                            )
                        default:
                            return null;

                    }

                })}
                <Grid item xs={12}>
                    <ImageUploader />
                </Grid>
            </Grid>
        
        </Fragment>
    );
}

export default EmployeeForm;
import React, {Fragment, useEffect, useState} from 'react';
import {
  Grid,
  Typography,
} from '@mui/material';

import Dropdown from '../../../components/Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { addService, editService, updateService } from '../../../store/slices/admin/serviceAdminSlice';
import { SERVICE_CATEGORIES } from '../../../constants/constants';
import TextField from '../../../components/TextField';

const ServiceForm = () => {
    const { services, editServiceId } = useSelector((state) => state.serviceAdmin);

    const FORM_VALUES = [
        {xs: 12, md: 12, type: "textField", id: "name", label: "Service Name", },
        {xs: 12, md: 12, type: "select", id: "category", label: "Category", options: [...SERVICE_CATEGORIES?.OPTIONS], placeholder: SERVICE_CATEGORIES?.PLACEHOLDER},
        {xs: 6, md: 6, type: "textField", id: "salePrice", label: "Sale Price"},
        {xs: 6, md: 6, type: "textField", id: "maxPrice", label: "Max Price"},
        {xs: 6, md: 6, type: "textField", id: "discountPrice", label: "Discount Price"},
        {xs: 6, md: 6, type: "textField", id: "discountPercent", label: "Discount Percent"},
        {xs: 6, md: 6, type: "textField", id: "duration", label: "Duration"},
    ]

    const dispatch = useDispatch();

    const initialState = {
        id: Math.floor(Math.random() * 1000) + 1,
        name: "",
        category: "",
        salePrice: "",
        maxPrice: "",
        discountPrice: "",
        discountPercent: "",
        duration: "",
    };

    const [service, setService] = useState({...initialState});

    const handleOnChange = (key, value) => {
        const serviceTemp = {...service};
        serviceTemp[key] = value;
        setService(serviceTemp);
    }

    const handleAddService = () => {
        if (editServiceId) {
            dispatch(updateService({ service }));
        } else {
            dispatch(addService({ service }));
        }
        
        setService({...initialState});
        dispatch(editService({editServiceId: null}));
    };

    useEffect(() => {
        if (editServiceId) {
            const serviceTemp = services?.filter(item => item?.id === editServiceId)?.[0];
            if (serviceTemp) {
                setService({...serviceTemp});
            }
            
        }
    }, [editServiceId, services])

    return (
        <Fragment>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography>{`${editServiceId ? "Edit" : "Add"} New Service`}</Typography>
            </Grid>
            
            <Grid container item spacing={2}>
                {FORM_VALUES?.map((item, index) => {
                    switch (item?.type) {
                        case "textField":
                            return (
                                <Grid key={index} item xs={item?.xs} md={item?.md} className="grid">
                                    <TextField
                                        id={item?.id}
                                        name={item?.id}
                                        label={item?.label}
                                        onChange={(e) => handleOnChange(item?.id, e.target.value)}
                                        value={service?.[item?.id]}
                                        fullWidth
                                    />
                                </Grid>
                            )
                        case "select":
                            return (
                                <Grid key={index} item xs={item?.xs} md={item?.md} className="grid">
                                    <Dropdown
                                        value={service?.[item?.id]}
                                        onChange={(e) => handleOnChange(item?.id, e.target.value)}
                                        options={item?.options}
                                        label={item?.placeholder}
                                    />
                                </Grid>
                            )
                        default:
                            return null;

                    }

                })}
            </Grid>
        </Grid>
        
        </Fragment>
    );
}

export default ServiceForm;
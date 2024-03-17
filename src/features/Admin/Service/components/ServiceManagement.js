import React, { useEffect, useState } from 'react';
import { Grid, IconButton } from '@mui/material';
import MUIDataTable from "mui-datatables";
import { Delete, Edit } from '@mui/icons-material';
import { editService, removeService } from '../../../../store/slices/admin/serviceAdminSlice';
import { useDispatch, useSelector } from 'react-redux';

const ServiceManagement = () => {
  const dispatch = useDispatch();
  const { services: servicesTemp } = useSelector((state) => state.serviceAdmin);

  const [services, setServices] = useState([...servicesTemp]);

  const columns = [
    {
      name: "actions",
      label: "Actions",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          console.log('tableMeta', tableMeta);
          return (
            <>
              <IconButton onClick={() => handleUpdateService(tableMeta.rowData[1])}>
                <Edit />
              </IconButton>
              <IconButton onClick={() => handleDeleteService(tableMeta.rowData[1])}>
                <Delete />
              </IconButton>
            </>
          );
        },
      },
    },
    {
      name: "id",
      label: "ID",
    },
    {
      name: "name",
      label: "Name",
    },
    {
      name: "category",
      label: "Category",
    },
    {
      name: "salePrice",
      label: "Sale Price",
    },
    {
      name: "maxPrice",
      label: "Max Price",
    },
    {
      name: "discountPrice",
      label: "Discount Price",
    },
    {
      name: "discountPercent",
      label: "Discount Percent",
    },
    {
      name: "duration",
      label: "Duration",
    },
  ];

  const options = {
    selectableRows: "none",
    responsive: "standard",
  };


  const handleUpdateService = (serviceId) => {
    // Update Service logic
    dispatch(editService({editServiceId: serviceId}));
  };

  const handleDeleteService = (serviceId) => {
    // Delete Service logic
    console.log('handleDeleteService: ', serviceId, services);
    dispatch(removeService({id: serviceId}));
    
  };

  useEffect(() => {
    setServices(servicesTemp);
  }, [servicesTemp]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <MUIDataTable
          title={"Services"}
          data={services}
          columns={columns}
          options={options}
        />
      </Grid>
    </Grid>
  );
};

export default ServiceManagement;

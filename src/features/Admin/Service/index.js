import React from 'react';
import { Grid, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import ServiceManagement from './components/ServiceManagement';

const categories = ['Haircut', 'Manicure', 'Pedicure', 'Massage', 'Facial'];

const Service = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        {/* <Typography variant="h6">Salon Services</Typography> */}
        {/* MUI DataTable component for salon services */}
        <ServiceManagement />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">Add New Service</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField label="Service Name" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select>
                {categories.map((category, index) => (
                  <MenuItem key={index} value={category}>{category}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Sale Price" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Max Price" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Discount Price" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Discount Percent" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Duration" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary">Add Service</Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Service;
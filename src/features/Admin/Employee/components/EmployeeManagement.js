import React, { useState } from 'react';
import { Grid, Typography } from '@mui/material';
import MUIDataTable from "mui-datatables";
import { Button } from '../../../../components/Button';

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([
    { id: 1, name: "John Doe", designation: "Software Engineer", image: "https://via.placeholder.com/50" },
    { id: 2, name: "Jane Smith", designation: "UI/UX Designer", image: "https://via.placeholder.com/50" },
    // Add more employees as needed
  ]);

  const columns = [
    {
      name: "actions",
      label: "Actions",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <>
              <Button variant="contained" color="primary" onClick={() => handleUpdateEmployee(tableMeta.rowData[0])}>Update</Button>
              <Button variant="contained" color="secondary" onClick={() => handleDeleteEmployee(tableMeta.rowData[0])}>Delete</Button>
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
      label: "Employee Name",
    },
    {
      name: "designation",
      label: "Designation",
    },
    {
      name: "image",
      label: "Image",
      options: {
        customBodyRender: (value) => <img src={value} alt="Employee" style={{ width: 50, height: 50, borderRadius: '50%' }} />,
      },
    },
  ];

  const options = {
    selectableRows: "none",
    responsive: "standard",
  };

  const handleAddEmployee = () => {
    // You can implement your logic to add a new employee here
    // For demonstration purposes, let's just add a new employee with dummy data

    
    const newEmployee = {
      id: employees.length + 1,
      name: "New Employee",
      designation: "New Designation",
      image: "https://via.placeholder.com/50",
    };
    setEmployees([...employees, newEmployee]);
  };

  const handleUpdateEmployee = (employeeId) => {
    // Update employee logic
  };

  const handleDeleteEmployee = (employeeId) => {
    // Delete employee logic
    setEmployees(employees.filter(employee => employee.id !== employeeId));
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <MUIDataTable
          title={"Employee List"}
          data={employees}
          columns={columns}
          options={options}
        />
      </Grid>
    </Grid>
  );
};

export default EmployeeManagement;

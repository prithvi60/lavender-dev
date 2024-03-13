import React, { useEffect, useState } from 'react';
import { Chip, Grid, IconButton } from '@mui/material';
import MUIDataTable from "mui-datatables";
import { Delete, Edit } from '@mui/icons-material';
import { editEmployee } from '../../../../store/slices/adminPageSlice';
import { useDispatch, useSelector } from 'react-redux';

const EmployeeManagement = () => {
  const dispatch = useDispatch();
  const { employees: employeesTemp } = useSelector((state) => state.adminPage);

  const [employees, setEmployees] = useState([...employeesTemp]);

  const columns = [
    {
      name: "actions",
      label: "Actions",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          console.log('tableMeta', tableMeta);
          return (
            <>
              <IconButton onClick={() => handleUpdateEmployee(tableMeta.rowData[1])}>
                <Edit />
              </IconButton>
              <IconButton onClick={() => handleDeleteEmployee(tableMeta.rowData[1])}>
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
      label: "Employee Name",
    },
    {
      name: "designation",
      label: "Designation",
    },
    {
      name: "status",
      label: "Status",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          console.log('tableMeta', tableMeta);
          return (
              <Chip label={tableMeta?.rowData[4]} style={{ color: "white", backgroundColor: tableMeta?.rowData[4] === "Active" ? "green" : "red"}} />
          );
        },
      },
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
    responsive: "vertical",
  };


  const handleUpdateEmployee = (employeeId) => {
    // Update employee logic
    dispatch(editEmployee({editEmployeeId: employeeId}));
  };

  const handleDeleteEmployee = (employeeId) => {
    // Delete employee logic
    console.log('handleDeleteEmployee: ', employeeId);
    setEmployees(employees.filter(employee => employee.id !== employeeId));
    
  };

  useEffect(() => {
    setEmployees(employeesTemp);
}, [employeesTemp])

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

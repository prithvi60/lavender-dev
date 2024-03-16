import React, { useEffect, useState } from 'react';
import { Grid, IconButton } from '@mui/material';
import MUIDataTable from "mui-datatables";
import { Delete, Edit } from '@mui/icons-material';
import { editEmployee, removeEmployee } from '../../../../store/slices/admin/employeeAdminSlice';
import { useDispatch, useSelector } from 'react-redux';

const ServiceManagement = () => {
  const dispatch = useDispatch();
  const { employees: employeesTemp } = useSelector((state) => state.employeeAdmin);

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


  const handleUpdateEmployee = (employeeId) => {
    // Update employee logic
    dispatch(editEmployee({editEmployeeId: employeeId}));
  };

  const handleDeleteEmployee = (employeeId) => {
    // Delete employee logic
    console.log('handleDeleteEmployee: ', employeeId, employees);
    // setEmployees(employees.filter(employee => employee.id !== employeeId));
    dispatch(removeEmployee({id: employeeId}));
    
  };

  useEffect(() => {
    setEmployees(employeesTemp);
  }, [employeesTemp]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <MUIDataTable
          title={"Services"}
          data={employees}
          columns={columns}
          options={options}
        />
      </Grid>
    </Grid>
  );
};

export default ServiceManagement;

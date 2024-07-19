import React, { useEffect, useState } from 'react';
import { Grid, IconButton, Select, MenuItem, Button } from '@mui/material';
import MUIDataTable from "mui-datatables";
import { AddCircle, Delete, Edit } from '@mui/icons-material';
import { editUser, removeUser, setAddUser } from '../../../store/slices/admin/userAdminSlice';
import { useDispatch, useSelector } from 'react-redux';
import ButtonRouter from '../../../components/ButtonRouter'; 
import { getRoute } from '../../../utils';
import { sampleEstablishments } from '../../../data/data';

import emptyLogo from '../../../assets/emptyImage.png';

const UserManagement = () => {
  const dispatch = useDispatch();
  const { users: usersTemp } = useSelector((state) => state.userAdmin);

  // const data = [
  //   { id: 1, userName: 'John Doe', email: 'john.doe@example.com', joined: '2022-01-01', status: 'Active', role: 'Admin' },
  //   { id: 2, userName: 'Jane Smith', email: 'jane.smith@example.com', joined: '2022-02-01', status: 'Inactive', role: 'User' },
  //   // Add more user data here...
  // ];

  const [users, setUsers] = useState([...usersTemp]);

  const columns = [
    {
      name: "username",
      label: "User Name",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div style={{ display: 'flex', alignItems: 'center', width: '20px' }}>
                <img src={emptyLogo} alt="Avatar" style={{ width: 30, height: 30, borderRadius: '50%', marginRight: 10 }} />
                {"Nehemiah"}
            </div>
          );
        },
      },
    },
    {
        name: "id",
        label: "ID",
    },
    {
      name: "email",
      label: "Email",
      options: {
        customBodyRender: (value) => <div style={{ width: '200px' }}>{value}</div>,
      },
    },
    {
      name: "joined",
      label: "Joined",
    },
    {
      name: "status",
      label: "Status",
      options: {
        customBodyRender: (value) => (
          <Select value={value} fullWidth>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </Select>
        ),
      },
    },
    {
        name: 'role',
        label: 'Role',
        options: {
          customBodyRender: (value) => (
            <Select value={value} fullWidth>
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="User">User</MenuItem>
            </Select>
          ),
        },
      },
      {
        name: "actions",
        label: "Actions",
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <>
                <IconButton onClick={() => handleUpdateUser(tableMeta.rowData[1])}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => handleDeleteUser(tableMeta.rowData[1])}>
                  <Delete />
                </IconButton>
              </>
            );
          },
        },
      },
  ];

  const options = {
    selectableRows: "multiple",
    responsive: "standard",
    rowsPerPageOptions: [5, 10, 15],
    toolbar: true,
    // onRowsSelect: (currentRowsSelected, allRowsSelected) => console.log(currentRowsSelected, allRowsSelected),
    customToolbar: () => {
      return (
        // <IconButton onClick={handleAddButtonClick}>
        //   <AddCircle />
        // </IconButton>
        <ButtonRouter name={"Add"} to={getLoginRoute()}/>
      );
    },
    headCells: {
      style: {
          textAlign: 'left',
      },
    },
  };

  const getLoginRoute = () => {
    return getRoute("Register")
  }

  const handleAddButtonClick = () => {
    dispatch(setAddUser({addUser: true}))
  };

  const handleUpdateUser = (userId) => {
    dispatch(editUser({editUserId: userId}));
  };

  const handleDeleteUser = (userId) => {
    dispatch(removeUser({id: userId}));
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <MUIDataTable
          title={""}
          data={users}
          columns={columns}
          options={options}
          className={"admin-table"}
        />
      </Grid>
    </Grid>
  );
};

export default UserManagement;

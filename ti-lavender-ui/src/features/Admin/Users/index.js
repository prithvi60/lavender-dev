import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Paper,
  Grid
} from '@mui/material';
import GridPaper from '../../../components/GridPaper';
import Text from '../../../components/Text';
import UserManagement from './UserManagement';

const Users = () => {
  const { addUser, editUserId } = useSelector((state) => state.userAdmin);

  const [data, setData] = useState({
    addUser: addUser,
    editUser: false
  });

  

  useEffect(() => {
    const dataTemp = {...data};
    dataTemp.addUser = addUser;
    setData(dataTemp);
  }, [addUser, data])

  return (
    <Fragment>
      <Grid container spacing={2}>
        {
          !data?.addUser &&
          <>
          <GridPaper
            component={<Text className='title' name={'Users'}/>}
          />
          <Grid item xs={12}>
            <UserManagement />
          </Grid>
          </>
          
        }
      </Grid>
    </Fragment>
  );
}

export default Users;
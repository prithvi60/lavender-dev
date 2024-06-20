import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Paper,
  Grid
} from '@mui/material';
import Button from '../../../components/Button';
import EstablishmentForm from './EstablishmentForm';
import EstablishmentManagement from './EstablishmentManagement';
import EstablishmentMenu from './EstablishmentMenu';
import BusinessHoursForm from './BusinessHoursForm';
import GridPaper from '../../../components/GridPaper';
import Text from '../../../components/Text';
import { setEstablishmentError } from '../../../store/slices/admin/establishmentAdminSlice';

const Establishment = () => {
  const { addEst, editEstablishmentId, establishmentError } = useSelector((state) => state.establishmentAdmin);
  
  const dispatch = useDispatch();

  const initialState = {
    id: Math.floor(Math.random() * 1000) + 1,
    name: "",
    about: "",
    addressLine1: "",
    addressLine2: "",
    area: "",
    state: "",
    postalCode: "",
    country: "",
    images: []
  };

  const [data, setData] = useState({
    editEst: false,
    establishment: initialState,
    onSubmit: false
  });


  const handleOnChange = (key, value) => {
    const dataTemp = {...data};
    dataTemp[key] = value;
    setData(dataTemp);
  }

  const handleOnMultipleChange = (keys, values) => {
    const dataTemp = {...data};
    keys?.forEach((key, index) => {
      dataTemp[key] = values[index];
    });
    setData(dataTemp);
  }

  const handleOnSubmit = () => {
    handleOnChange('onSubmit', true);
  }

  useEffect(() => {
    if (!addEst || establishmentError) {
      handleOnChange('onSubmit', false);
      dispatch(setEstablishmentError({ establishmentError: false }));
    }
  }, [addEst, establishmentError])

  return (
    <Fragment>
      <Grid container spacing={2}>
        {
          (!addEst && editEstablishmentId == null) &&
          <>
          <GridPaper
            component={<Text className='title' name={'Establishments'}/>}
          />
          <Grid item xs={12}>
            <EstablishmentManagement />
          </Grid>
          </>
        }
        {
          (addEst || editEstablishmentId)  &&
          <>
            <GridPaper
              component={<Text className='title' name={`${editEstablishmentId ? "Edit" : "Add"} New Establishment`}/>}
            />
            <Grid item xs={12} md={7} lg={8}>
              <Paper className='est-paper' elevation={0}>
                <EstablishmentForm onSubmit={data?.onSubmit}/>
              </Paper>
            </Grid>
            <Grid item xs={12} md={5} lg={4}>
              <Paper className='est-paper' elevation={0}>
                <BusinessHoursForm onSubmit={data?.onSubmit}/>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className='est-paper' elevation={0}>
                <EstablishmentMenu onSubmit={data?.onSubmit}/>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className='est-paper' elevation={0}>
                <Button
                  onClick={handleOnSubmit}
                  name={"Submit"}
                  sx={{ mt: 3, ml: 1 }}
                />
              </Paper>
            </Grid>
          </>
        }
      </Grid>
    </Fragment>
  );
}

export default Establishment;
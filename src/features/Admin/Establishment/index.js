import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
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

const Establishment = () => {
  const { addEst, editEstablishmentId } = useSelector((state) => state.establishmentAdmin);

  const [data, setData] = useState({
    addEst: addEst,
    editEst: false
  });

  useEffect(() => {
    const dataTemp = {...data};
    dataTemp.addEst = addEst;
    setData(dataTemp);
  }, [addEst, data])

  return (
    <Fragment>
      <Grid container spacing={2}>
        {
          !data?.addEst &&
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
          data?.addEst &&
          <>
            <GridPaper
              component={<Text className='title' name={`${editEstablishmentId ? "Edit" : "Add"} New Establishment`}/>}
            />
            <Grid item xs={12} md={7} lg={8}>
              <Paper className='est-paper' elevation={0}>
                <EstablishmentForm />
              </Paper>
            </Grid>
            <Grid item xs={12} md={5} lg={4}>
              <Paper className='est-paper' elevation={0}>
                <BusinessHoursForm />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className='est-paper' elevation={0}>
                <EstablishmentMenu />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className='est-paper' elevation={0}>
                <Button
                  onClick={() => {}}
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
import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Paper,
  Grid,
  Typography
} from '@mui/material';
import Button from '../../../components/Button';
import EstablishmentForm from './EstablishmentForm';
import EstablishmentManagement from './EstablishmentManagement';
import EstablishmentMenu from './EstablishmentMenu';
import BusinessHoursForm from './BusinessHoursForm';
import GridPaper from '../../../components/GridPaper';

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
  }, [addEst])

  return (
    <Fragment>
      <Grid container spacing={2}>
        {
          !data?.addEst &&
          <>
          <GridPaper
            component={<Typography className='title'>{'Establishments'}</Typography>}
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
              component={<Typography className='title'>{`${editEstablishmentId ? "Edit" : "Add"} New Establishment`}</Typography>}
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
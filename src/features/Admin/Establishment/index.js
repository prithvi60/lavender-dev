import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Paper,
  Grid
} from '@mui/material';
import EstablishmentForm from './components/EstablishmentForm';
import EstablishmentManagement from './components/EstablishmentManagement';
import EstablishmentMenu from './EstablishmentMenu';

const Establishment = () => {
  const { addEst } = useSelector((state) => state.establishmentAdmin);

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
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <EstablishmentManagement />
        </Grid>
        {
          data?.addEst &&
          <>
            <Grid item xs={12}>
              <Paper className='est-paper'>
                <EstablishmentForm />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className='est-paper'>
                <EstablishmentMenu />
              </Paper>
            </Grid>
          </>
          
        }
      </Grid>
    </Fragment>
  );
}

export default Establishment;
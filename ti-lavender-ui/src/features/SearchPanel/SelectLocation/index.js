import React, { Fragment } from 'react';
import { Grid } from '@mui/material';
import Text from '../../../components/Text';
import CategoryPanel from './CategoryPanel';
import TreatmentPanel from './TreatmentPanel';

const SelectLocation = () => {
  return ( <>
    <Fragment>
      <Grid container spacing={2} className='select-location'>
        <Grid item xs={7} md={7} lg={7} className="grid">
        </Grid>
        <Grid item xs={5} md={5} lg={5} className="grid">
            <Text variant="body1" className="bold" align="left" name="Categories"/>
        </Grid>
      </Grid>
    </Fragment>
  </>);
}

export default SelectLocation;
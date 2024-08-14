import React, { Fragment } from 'react';
import { Grid } from '@mui/material';
import Text from '../../../components/Text';
import CategoryPanel from './CategoryPanel';
import TreatmentPanel from './TreatmentPanel';

const SelectTreatment = () => {
  return ( <>
    <Fragment>
      <Grid container spacing={2} className='select-treatment'>
        <Grid item xs={7} md={7} lg={7} className="grid">
          <TreatmentPanel />
        </Grid>
        <Grid item xs={5} md={5} lg={5} className="grid">
            <Text variant="body1" sx={{fontSize: '18px', fontWeight: 700, color: '#4D4D4D'}} align="left" name="Categories"/>
            <CategoryPanel />
        </Grid>
      </Grid>
    </Fragment>
  </>);
}

export default SelectTreatment;
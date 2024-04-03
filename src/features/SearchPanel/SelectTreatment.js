import React, { Fragment } from 'react';
import { Grid, Box } from '@mui/material';
import Text from '../../components/Text';
import CategoryPanel from '../SearchPanel/SelectTreatment/CategoryPanel'
import TreatmentPanel from './TreatmentPanel.tsx'


const SelectTreatment = () => {
  return ( <>
    <Fragment>
      <Grid container spacing={2} className='select-treatment'>
        <Grid item xs={7} md={7} lg={7} className="grid">
          <TreatmentPanel />
        </Grid>
        <Grid item xs={5} md={5} lg={5} className="grid">
            <Box>
              <Text variant="body1" className="bold" align="left" name="Categories"/>
              <CategoryPanel />
            </Box>
        </Grid>
      </Grid>
    </Fragment>
  </>);
}

export default SelectTreatment;
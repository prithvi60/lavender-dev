import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Divider, Grid, Box, Button } from '@mui/material';
import Text from '../../components/Text';
import Chip from '../../components/Chip';

const SelectTreatment = () => {

  const sampleData = {
    treatments: [
      'Hair Colouring', 'Hair Cut', 'Manicure', 'Pedicure',
      'Body exfoliation', 'Body wraps', 'Body sculpting', 'Body conditioning',
      'Body exfoliation', 'Body wraps', 'Body sculpting', 'Body conditioning',
      'Body exfoliation', 'Body wraps', 'Body sculpting', 'Body conditioning',
      'Body exfoliation', 'Body wraps', 'Body sculpting', 'Body conditioning'
    ],
    categories: [
      'hair', 'body', 'massage', 'nails', 'hair', 'body'
    ]
  }

  const [data, setData] = useState({
    treatments: [],
    categories: []
  });

  const handleOnChange = (key, value) => {
    const dataTemp = {...data};
    dataTemp[key] = value;
    setData(dataTemp);
  }

  const handleTagSelect = (tag) => {
    const newTags = [...data?.treatments, tag];
    handleOnChange('treatments', newTags);
  };

  const handleTagRemove = (tag) => {
    const updatedTags = data?.treatments?.filter((item) => item !== tag);
    handleOnChange('treatments', updatedTags);
  };

  return ( <>
    <Fragment>
      <Grid container spacing={2} className='select-treatment'>
        <Grid item xs={7} md={7} lg={7} className="grid">
            <Grid item xs={12}>
              <Text variant="body1" align="left" className="bold" name="Choose your Treatments"/>
            </Grid>
            <Grid container spacing={2} className='treatment-grid'>
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  {data?.treatments?.map((tag, index) => (
                    <Grid item key={index}>
                      <Chip type={"deletable"} className="delete" label={tag} onDelete={() => handleTagRemove(tag)}  />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  {sampleData?.treatments?.map((tag, index) => (
                    <Grid item key={index}>
                      <Chip type={"clickable"} label={tag} onClick={() => handleTagSelect(tag)} />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
        </Grid>
        <Grid item xs={5} md={5} lg={5} className="grid">
            <Box>
              <Text variant="body1" className="bold" align="left" name="Categories"/>
            </Box>
        </Grid>
      </Grid>
    </Fragment>
  </>);
}

export default SelectTreatment;
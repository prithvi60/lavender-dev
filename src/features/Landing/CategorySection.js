import React from 'react';
import { Grid, Box } from '@mui/material';
import Text from '../../components/Text';
import GetImage from '../../assets/GetImage.tsx';
import { categories } from '../../constants/constants.js';

const CategorySection = () => {
  return (
    <section className="landing-section">
      <Grid item xs={12} className="pt-16 pb-8 md:pb-16">
        <Text sx={styles.header} name={'Explore our Categories'} />
      </Grid>
      <Grid container spacing={2} justifyContent="space-evenly" alignItems="center">
        {categories.map((category) => (
          <Grid item key={category.id}>
            <a href="" className="flex justify-center">
              <GetImage className="w-20 md:w-36" imageName={category.image} />
            </a>
            <p className="urbanist-font text-center font-semibold mt-2 text-lg">{category?.name}</p>
          </Grid>
        ))}
      </Grid>
    </section>
  );
};

const styles = {
  header: {
    fontSize: '36px',
    fontWeight: 600,
    color: '#333333',
    lineHeight: '43px',
    textAlign: 'center', // Adjusted for center alignment
  },
};

export default CategorySection;

import React from 'react';
import { Grid } from '@mui/material';
import Text from '../../components/Text';
import emptyLogo from '../../assets/emptyImage.png';
import GetImage from '../../assets/GetImage.tsx'

import {categories} from '../../constants/constants.js'

const CategorySection = () => {

  

    return ( 
        <section className="landing-section">
            <Grid item xs={12} className="category-title">
                <Text variant="h4" align="center" name="Explore our Categories" />
            </Grid>
            <Grid container spacing={2} justifyContent="space-evenly" alignItems="center">
                {categories.map((category) => (
                <Grid item key={category.id}>
                    <a href='' className="category-link">
                        {/* <img src={category.image} alt={category.name} className="category-image" /> */}
                   <GetImage imageName={category.image}/>
                    </a>
                    <Text className='urbanist-font ' variant="body2" align="center" name={category?.name} />
                </Grid>
                ))}
            </Grid>
        </section>
    );
}

export default CategorySection;
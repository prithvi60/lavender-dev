import React from 'react';
import { Grid } from '@mui/material';
import Text from '../../components/Text';
import emptyLogo from '../../assets/emptyImage.png';
import GetImage from '../../assets/GetImage.tsx'

import {categories} from '../../constants/constants.js'

const CategorySection = () => {

  

    return ( 
        <section className="landing-section">
            <Grid item xs={12} className="pt-16 pb-8 md:pb-16">
                <h4 className='text-2xl md:text-4xl font-semibold text-center text'>Explore our Categories</h4>
            </Grid>
            <Grid container spacing={2} justifyContent="space-evenly" alignItems="center">
                {categories.map((category) => (
                <Grid item key={category.id}>
                    <a href='' className="flex justify-center">
                        {/* <img src={category.image} alt={category.name} className="category-image" /> */}
                   <GetImage className='w-20 md:w-36' imageName={category.image}/>
                    </a>
                    <p className='urbanist-font text-center font-semibold mt-2 text-lg'>{category?.name}</p>
                </Grid>
                ))}
            </Grid>
        </section>
    );
}

export default CategorySection;
import React from 'react';
import { Grid } from '@mui/material';
import Text from '../../components/Text';

import emptyLogo from '../../assets/emptyImage.png';

const CategorySection = () => {

    const categories = [
        { id: 1, name: 'Hair', image: emptyLogo },
        { id: 2, name: 'Nail', image: emptyLogo },
        { id: 3, name: 'Spa', image: emptyLogo },
        { id: 4, name: 'Hair', image: emptyLogo },
        { id: 5, name: 'Nail', image: emptyLogo },
        { id: 6, name: 'Spa', image: emptyLogo },
        { id: 7, name: 'Hair', image: emptyLogo },
      ];

    return ( 
        <section className="landing-section">
            <Grid item xs={12} className="category-title">
                <Text variant="h4" align="center" name="Explore our Categories" />
            </Grid>
            <Grid container spacing={2} justifyContent="space-evenly" alignItems="center">
                {categories.map((category) => (
                <Grid item key={category.id}>
                    <a className="category-link">
                        <img src={category.image} alt={category.name} className="category-image" />
                    </a>
                    <Text variant="body2" align="center" name={category?.name} />
                </Grid>
                ))}
            </Grid>
        </section>
    );
}

export default CategorySection;
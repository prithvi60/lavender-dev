import React from 'react';
import { LANDING_PAGE } from '../../constants/constants';
import SearchPanel from '../SearchPanel';
import Text from '../../components/Text';

const HeroSection = () => {
    return ( 
        <section className="hero-section">
            <section className="hero-content">
                <Text variant="h3" name={LANDING_PAGE?.TITLE}/>
                <Text variant="body1" name={LANDING_PAGE?.SUBTITLE}/>
                <SearchPanel />
            </section>
        </section>
    );
}

export default HeroSection;
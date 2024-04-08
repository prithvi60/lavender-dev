import React from 'react';
import { LANDING_PAGE } from '../../constants/constants';
import SearchPanel from '../SearchPanel';
import NewSearchPanel from '../SearchPanel/NewSearchPanel';

import Text from '../../components/Text';

const HeroSection = () => {
    return ( 
        <section className="hero-section">
            <section className="hero-content">
                <Text className="hero-title" variant="h3" name={LANDING_PAGE?.TITLE}/>
                <Text className="hero-title" variant="body1" name={LANDING_PAGE?.SUBTITLE}/>
                {/* <SearchPanel /> */}
                <NewSearchPanel/>
            </section>
        </section>
    );
}

export default HeroSection;
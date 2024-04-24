import React from 'react';
import { LANDING_PAGE } from '../../constants/constants';
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

                <div className='mt-4 leading-10	 font-bold text-5xl'>Book your next salon experience </div>
                <div className='mb-8 mt-2 leading-10 font-bold text-5xl'>with Lavender.</div>

            </section>
        </section>
    );
}

export default HeroSection;
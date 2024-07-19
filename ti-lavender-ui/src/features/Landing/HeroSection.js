import React from 'react';
import { LANDING_PAGE } from '../../constants/constants';
import NewSearchPanel from '../SearchPanel/NewSearchPanel';

import Text from '../../components/Text';

const HeroSection = () => {
    return ( 
        <section className="hero-section">
            <section className="hero-content">
                <Text className="hero-title urbanist-font " variant="h3" name={LANDING_PAGE?.TITLE}/>
                <Text className="hero-title urbanist-font " variant="body1" name={LANDING_PAGE?.SUBTITLE}/>
                {/* <SearchPanel /> */}
                <NewSearchPanel/>

                <div className='urbanist-font mt-4 leading-10 mt-12 font-bold text-3xl md:text-5xl'>Book your next salon experience </div>
                <div className='urbanist-font mb-8 mt-2 leading-10 font-bold text-3xl md:text-5xl'>with Lavender.</div>

            </section>
        </section>
    );
}

export default HeroSection;
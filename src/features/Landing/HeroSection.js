import React from 'react';
import { LANDING_PAGE } from '../../constants/constants';
import SearchPanel from '../SearchPanel';

const HeroSection = () => {
    return ( 
        <section className="hero-section">
            <section className="hero-content">
                <h1>{LANDING_PAGE?.TITLE}</h1>
                <p>{LANDING_PAGE?.SUBTITLE}</p>
                <SearchPanel />
            </section>
        </section>
    );
}

export default HeroSection;
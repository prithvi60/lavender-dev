import React from 'react';
import { LANDING_PAGE } from '../../constants/constants';

import Navbar from '../../components/NavBar';
import SearchPanel from '../SearchPanel';

const HeroSection = () => {
    return ( 
        <section className="b-hero-section">
            <section>
                <Navbar />
            </section>
            <section className="b-hero-content">
                <h1>{LANDING_PAGE?.TITLE}</h1>
                <p>{LANDING_PAGE?.SUBTITLE}</p>
                <SearchPanel />
            </section>
        </section>
    );
}

export default HeroSection;
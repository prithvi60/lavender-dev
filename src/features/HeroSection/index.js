import React from 'react';
import { LANDING_PAGE } from '../../constants/constants';

import './index.css';
import Navbar from '../../components/NavBar';
import SearchPanel from '../SearchPanel';

const HeroSection = () => {
    return ( 
        <section className="heroSection">
            <section>
                <Navbar />
            </section>
            <section className="heroContent">
                <h1>{LANDING_PAGE?.TITLE}</h1>
                <p>{LANDING_PAGE?.SUBTITLE}</p>
                <SearchPanel />
            </section>
        </section>
     );
}

export default HeroSection;
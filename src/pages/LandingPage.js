import React from 'react';
import HeroSection from '../features/Landing/HeroSection';
import CategorySection from '../features/Landing/CategorySection';
import RecommendSection from '../features/Landing/RecommendSection';

const LandingPage = () => {
    return (
        <div className='landing-page'>
            <HeroSection />
            <CategorySection />
            <RecommendSection />
        </div>
        
     );
}

export default LandingPage;
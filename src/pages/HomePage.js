import React from 'react';

import './HomePage.css';
import { Banner } from '../components/componentHelpers';
import SearchPage from '../features/SearchPage';

function HomePage() {
    return (
        <div >
            <Banner />
            <div className="homeCardDiv">
                <SearchPage/>
            </div>
        </div>
        
     );
}

export default HomePage;
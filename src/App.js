import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import PageNotFound from './pages/PageNotFound';
import { routes } from "./routes"; 

import './App.css';
import Loader from './components/Loader';

const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Establishments = React.lazy(() => import('./pages/Establishments'));
const Bookings = React.lazy(() => import('./pages/Bookings'));
const components = [Dashboard, Establishments, Bookings];

const App = () => {
  return (
    <BrowserRouter>
        <div className="b-app">
          <Routes>
            <Route path="/" exact element={<LandingPage />}/>
            {routes?.map((route, index) => {
              const Component = components?.[index];
              return (<Route 
                key={index}
                path={route.path}
                exact={route.exact}
                element={
                  <Suspense fallback={<Loader />}>
                    <Component />
                  </Suspense>
                }
              />)
            })}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
    </BrowserRouter>
    
  );
}

export default App;

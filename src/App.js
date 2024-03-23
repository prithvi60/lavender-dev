import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import PageNotFound from './pages/PageNotFound';
import { routes } from "./routes"; 
import Loader from './components/Loader';
import './styles/global.css';
import './styles/admin.css';
import './styles/login.css';
import './styles/landing.css';

const Admin = React.lazy(() => import('./pages/AdminPage'));
const Places = React.lazy(() => import('./pages/Places'));
const Bookings = React.lazy(() => import('./pages/Bookings'));
const Login = React.lazy(() => import('./pages/LoginPage'));
const components = [Admin, Places, Bookings, Login];

const App = () => {
  return (
    <BrowserRouter>
        <div className="app">
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

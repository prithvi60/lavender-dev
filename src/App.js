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
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import SearchDetailsPage from './pages/SearchDetailsPage'

const Admin = React.lazy(() => import('./pages/AdminPage'));
const Places = React.lazy(() => import('./pages/Places'));
const Bookings = React.lazy(() => import('./pages/Bookings'));
const Login = React.lazy(() => import('./pages/LoginPage'));
const Register = React.lazy(() => import('./pages/RegisterPage'));
const Search = React.lazy(() => import('./pages/SearchPage'));
const BusinessSchedule = React.lazy(() => import('./pages/BusinessSchedulePage'));
// const SearchDetails = React.lazy(() => import('./pages/SearchDetailsPage'));

const components = [Admin, Places, Bookings, Login, Register, Search, BusinessSchedule];
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
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
            <Route path='/salon/:estId' element={<SearchDetailsPage />}></Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
        </BrowserRouter>
    </QueryClientProvider>
    
    
  );
}

export default App;

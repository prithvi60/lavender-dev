import React, {useState} from 'react';
import { AppBar, Toolbar } from '@mui/material';
import Text from './Text';
import ButtonRouter from './ButtonRouter';
import { getRoute } from '../utils';
import TextRouter from './TextRouter';
import NewSearchPanel from '../features/SearchPanel/NewSearchPanel';
import NavFilter from './NavFilter.tsx'
import { useNavigate } from 'react-router-dom';

const Navbar = (props) => {

  const { isSearchPage } = props;

  const getLoginRoute = () => {
    return getRoute("Login")
  }

  const getAdminRoute = () => {
    return getRoute("Admin");
  }

  const gotoLandingPage = () => {
    return navigate("/");
  }

  const navigate = useNavigate();

  return (
    <AppBar position="fixed" className="nav-bar">
      <Toolbar>
        <Text onClick= {gotoLandingPage} align="left" className="nav-bar-title flex" variant="h6" sx={{ flexGrow: 1 }} name="Lavender"/>
        {isSearchPage && <NavFilter />}
        <TextRouter className='nav-bar-title' variant="body2" name="Business" to={getAdminRoute()}/>
        <ButtonRouter name={"Login"} to={getLoginRoute()}/>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
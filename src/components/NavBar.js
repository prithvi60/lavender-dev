import React, { useEffect, useState } from "react";
import { AppBar, Avatar, Toolbar } from "@mui/material";
import Text from "./Text";
import ButtonRouter from "./ButtonRouter";
import { getRoute } from "../utils";
import TextRouter from "./TextRouter";
import NewSearchPanel from "../features/SearchPanel/NewSearchPanel";
import NavFilter from "./NavFilter.tsx";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import GetIcon from "../assets/Icon/icon.tsx";
import PersonIcon from "@mui/icons-material/Person";
import endpoint from "../api/endpoints.ts";

const Navbar = (props) => {
  const { isSearchPage, isLoggedIn } = props;

  const [showSearchBar, setshowSearchBar] = useState(false);
  const [userName, setUserName] = useState('');
  const [userType, setUserType] = useState('');

  useEffect(()=>{
    setTimeout(()=>{
      if(localStorage.getItem('Token')){
        const fetchCurrentUserDetails = async () => {
            try {
              const response = await endpoint.getCurrentUserDetails(); // Call the async function to get user details
              const userDetails = response?.data; // Assuming response.data contains the user details
              setUserName(userDetails?.data?.fullName)
              setUserType(userDetails?.data?.userType)
            } catch (error) {
              console.error('Error fetching user details:', error); // Handle any errors that occur
            }
          }
          fetchCurrentUserDetails();
      }
    },[1000])
    
  },[])

  const getLoginRoute = () => {
    return navigate('/login')
  };

  function getUserRoute(){
  navigate('/userprofile')
  };

  const getAdminRoute = () => {
    return getRoute("Admin");
  };

  const getBusinessRoute = () => {
    return getRoute("Business");
  };
  const gotoLandingPage = () => {
    return navigate("/");
  };

  const navigate = useNavigate();

  function handleLogOutBtn(){
    localStorage.clear();
    return navigate(0);
  }

  return (
    <>
      <AppBar position="fixed" className="nav-bar">
        <Toolbar>
          <GetIcon
            className="cursor-pointer"
            onClick={gotoLandingPage}
            iconName="LavenderLogo"
          />
          <Text
            onClick={gotoLandingPage}
            align="left"
            className="cursor-pointer nav-bar-title flex"
            variant="h6"
            sx={{ flexGrow: 1 }}
            name="Lavender"
          />
          {isSearchPage && <NavFilter setshowSearchBar={setshowSearchBar} />}
          <Stack spacing={2} direction="row">
            {
              isLoggedIn && <Button
              onClick={()=>{handleLogOutBtn()}}
              className="button-outline"
              variant="outlined"
            >
              Logout
            </Button>
            }
            {
              userType === "BU" && <Button
              href={getBusinessRoute()}
              className="button-outline"
              variant="outlined"
            >
              Business
            </Button>
            }
            
            {isLoggedIn ? (
                <ButtonRouter name={userName} to={'/userprofile'} startIcon={<PersonIcon />} />
            ) : (
                <ButtonRouter name={"Login"} to={'/login'} />
            )}
          </Stack>
          {isSearchPage && showSearchBar && (
            <div className="searched-search-panel">
              <NewSearchPanel />
            </div>
          )}
        </Toolbar>
      </AppBar>
      {isSearchPage && showSearchBar && <div className="search-overlay"></div>}
    </>
  );
};

export default Navbar;

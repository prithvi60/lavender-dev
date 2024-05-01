import React, { useState } from "react";
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


const Navbar = (props) => {
  const { isSearchPage } = props;

  const [showSearchBar, setshowSearchBar] = useState(false);

  const getLoginRoute = () => {
    return getRoute("Login");
  };

  const getUserRoute = () => {
    return getRoute("UserProfile");
  }

  const getAdminRoute = () => {
    return getRoute("Admin");
  };

  const gotoLandingPage = () => {
    return navigate("/");
  };

  const navigate = useNavigate();

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
             <Button
              href={getAdminRoute()}
              className="button-outline"
              variant="outlined"
            >
              Business
            </Button>
            <ButtonRouter name={"Login"} to={getLoginRoute()} />
            <ButtonRouter startIcon={<PersonIcon />} name={"Olivia"} to={'/userprofile'} />
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

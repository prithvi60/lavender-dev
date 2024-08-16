import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Stack,
  Box,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Button from "./Button.js";
import ButtonRouter from "./ButtonRouter";
import { getRoute } from "../utils";
import GetIcon from "../assets/Icon/icon.tsx";
import { useNavigate } from "react-router-dom";
import endpoint from "../api/endpoints.ts";
import NavFilter from "./NavFilter.tsx";
import NewSearchPanel from "../features/SearchPanel/NewSearchPanel.jsx";

const Navbar = (props) => {
  const { isSearchPage, isLoggedIn } = props;
  const [showSearchBar, setshowSearchBar] = useState(false);
  const [userName, setUserName] = useState("");
  const [userType, setUserType] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    setTimeout(() => {
      if (localStorage.getItem("Token")) {
        const fetchCurrentUserDetails = async () => {
          try {
            const response = await endpoint.getCurrentUserDetails();
            const userDetails = response?.data;
            setUserName(userDetails?.data?.fullName);
            setUserType(userDetails?.data?.userType);
          } catch (error) {
            console.error("Error fetching user details:", error);
          }
        };
        fetchCurrentUserDetails();
      }
    }, 1000);
  }, []);

  const navigate = useNavigate();

  const handleLogOutBtn = () => {
    localStorage.clear();
    return navigate("/");
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar position="fixed" className="nav-bar !shadow-sm">
        <Toolbar>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              flexGrow: 1,
              padding: "5px 0px",
              "@media (max-width: 600px)": {
                flexDirection: "row",
                alignItems: "stretch",
              },
            }}
          >
            <GetIcon
              className="cursor-pointer nav-bar-title"
              align="left"
              onClick={() => navigate("/")}
              iconName="LavenderFullLogo"
            />
            <Box>
            {isSearchPage && (
              <Box
                sx={{
                  width: "100%",
                  // marginLeft: "200px",
                  // "@media (max-width: 600px)": {
                  //   marginTop: "10%",
                  //   width: "fit-content",
                  //   marginRight: "-2%",
                  // },
                }}
                className="hidden md:block"
              >
                <NavFilter setshowSearchBar={setshowSearchBar} />
              </Box>
            )}
            </Box>
            <Stack spacing={2} direction="row">
              {isLoggedIn ? (
                <>
                  {isMobile ? (
                    <GetIcon
                      iconName="MenuIcon"
                      onClick={handleMenuOpen}
                      className="block cursor-pointer"
                    />
                  ) : (
                    <>
                      <Button
                        onClick={handleLogOutBtn}
                        className="button-outline"
                        variant="outlined"
                        name="Logout"
                        sx={{
                          width: "120px",
                          height: "37px",
                          fontFamily: "Urbanist",
                          borderRadius: "10px",
                        }}
                      />
                      <ButtonRouter
                        sx={{
                          width: "120px",
                          height: "37px",
                          fontFamily: "Urbanist",
                          borderRadius: "10px",
                          whiteSpace: "nowrap",
                        }}
                        name={userName}
                        to="/userprofile"
                      />
                    </>
                  )}
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem
                      onClick={() => {
                        handleMenuClose();
                        navigate("/userprofile");
                      }}
                    >
                      {userName}'s profile
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleMenuClose();
                        navigate("/settings");
                      }}
                    >
                      Settings
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleMenuClose();
                        handleLogOutBtn();
                      }}
                    >
                      Sign out
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <ButtonRouter
                  sx={{
                    width: "120px",
                    height: "37px",
                    fontFamily: "Urbanist",
                    borderRadius: "10px",
                  }}
                  name={"Log in"}
                  to="/login"
                />
              )}
              {userType === "BU" && (
                <Button
                  href={getRoute("Business")}
                  className="button-outline"
                  variant="outlined"
                  name={"Business"}
                  sx={{
                    width: "120px",
                    height: "37px",
                    fontFamily: "Urbanist",
                    borderRadius: "10px",
                  }}
                />
              )}
            </Stack>
          </Box>
          <Box className={"md:hidden w-full flex justify-end my-1"}>
            {isSearchPage && (
              <Box
                sx={{
                  width: "max-content",
                  // marginLeft: "200px",
                  // marginRight: "40px",
                  // "@media (max-width: 600px)": {
                  //   marginTop: "10%",
                  //   width: "fit-content",
                  //   marginRight: "-2%",
                  // },
                }}
              >
                <NavFilter setshowSearchBar={setshowSearchBar} />
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {isSearchPage && showSearchBar && (
        <div className="searched-search-panel mt-[100px]">
          <NewSearchPanel />
        </div>
      )}
    </>
  );
};

export default Navbar;

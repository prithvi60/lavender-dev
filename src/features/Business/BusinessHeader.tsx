import GetIcon from "../../assets/Icon/icon";
import Text from "../../components/Text";
import { getRoute } from "../../utils";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const BusinessHeader = ({ pageName, toggleSidebar }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleLogOutBtn = () => {
    localStorage.clear();
    return navigate("/");
  };

  return (
    <AppBar position="static" className="bg-white md:text-sm shadow-md w-full">
      <Toolbar className="gap-x-14 items-center px-2 md:px-4 py-2">
        <div className="flex flex-row items-center justify-between p-2 w-full">
          {pageName === "onboard" ? (
            <GetIcon
              className="cursor-pointer mr-8"
              href={() => getRoute("Login")}
              iconName="LavenderFullLogo"
            />
          ) : (
            <GetIcon
              className="cursor-pointer mr-8"
              href={() => getRoute("Login")}
              iconName="LavenderLogo"
            />
          )}
    {  pageName !== "onboard"  &&  <Text
            align="left"
            className="cursor-pointer nav-bar-title flex"
            variant="h6"
            sx={{ flexGrow: 1 }}
            name={pageName || "Lavender"}
          />}
          {isMobile ? (
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={toggleSidebar}
            >
              <GetIcon iconName="MenuIcon" />
            </IconButton>
          ) : (
            <div className="flex-1 gap-x-6 items-center justify-end mt-6 space-y-6 md:flex md:space-y-0 md:mt-0">
              <Button
                onClick={handleLogOutBtn}
                variant="outlined"
                sx={{
                  width: "120px",
                  height: "37px",
                  fontFamily: "Urbanist",
                  borderRadius: "10px",
                  textTransform: "none",
                }}
              >
                Logout
              </Button>
              <GetIcon iconName="NotificationBell" />
              <GetIcon iconName="BusinessProfile" />
            </div>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default BusinessHeader;

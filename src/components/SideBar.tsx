import { BUSINESS_NAV } from "../constants/constants";
import GetIcon from "../assets/Icon/icon";
import { Tooltip } from "@mui/material";
import Zoom from "@mui/material/Zoom";
import { useMediaQuery, useTheme } from "@mui/material";

function SideBar({ activeField, onChange, onClose }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div
      style={{
        minHeight: isMobile ? "100vh" : "800px",
        maxHeight: "100%",
        overflowY: "auto",
      }}
    >
      <div className="bg-white-500 w-16 flex flex-col content-between">
        {BUSINESS_NAV.map((field, index) => {
          return (
            <div
              key={index}
              className={`pl-3 pr-2.5 py-3`}
              onClick={() => {
                onChange(field.label);
                if (onClose) onClose();
              }}
              style={{
                backgroundColor:
                  activeField === field.label ? "#825FFF" : "white",
              }}
            >
              <Tooltip
                title={field.label}
                TransitionComponent={Zoom}
                placement="right"
                arrow
                componentsProps={{
                  tooltip: {
                    sx: {
                      bgcolor: "#825FFF",
                      "& .MuiTooltip-arrow": {
                        color: "#825FFF",
                      },
                      padding: "10px",
                      fontWeight: "bold",
                    },
                  },
                }}
              >
                <div>
                  <GetIcon
                    isActive={activeField === field.label}
                    iconName={field.iconName}
                  />
                </div>
              </Tooltip>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SideBar;

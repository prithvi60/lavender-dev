import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Divider from "@mui/material/Divider";
import CheckBox from "./CheckBox";
import {
  updateCheckOut,
  resetCheckOut,
} from "../../store/slices/checkOutPageSlice";
import { useDispatch } from "react-redux";
import GetIcon from "../../assets/Icon/icon";
import Text from "../../components/Text";

function OptionsModal({ props, selectedService, isMobile, onServiceClick }) {
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(selectedService);
  const [selectAll, setSelectAll] = useState(selectedService.length === props.options.length);
  
  useEffect(() => {
    updateReduxStore();
    setSelectAll(selectedOptions.length === props.options.length);
  }, [selectedOptions]);


  const handleOpen = () => {
    if (props.options.length === 1) {
      onServiceClick();
    } else {
      setIsOpen(true);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSelectAll = () => {
    if (selectedOptions?.length === props?.options?.length) {
      setSelectedOptions([]);
    } else {
      setSelectedOptions(props?.options?.map((option) => option?.optionId));
    }
  };
  const handleOptionSelect = (optionId) => {
    setSelectedOptions((prev) => {
      if (prev.includes(optionId)) {
        dispatch(resetCheckOut({ serviceId: props?.serviceId, optionId }));
        return prev.filter((id) => id !== optionId);
      } else {
        const option = props?.options.find(opt => opt?.optionId === optionId);
        if (option) {
          dispatch(updateCheckOut({
            serviceId: props.serviceId,
            optionId: option.optionId,
            serviceName: option.optionName,
            finalPrice: option.salePrice,
            serviceDuration: option.duration || 0, // Ensure duration is always included, default to 0 if not available
          }));
        }
        return [...prev, optionId];
      }
    });
  };
  
  const updateReduxStore = () => {
    const deselectedOptions = props?.options
      .filter((option) => !selectedOptions.includes(option.optionId))
      .map((option) => option.optionId);

    selectedOptions?.forEach((optionId) => {
      const selectedOption = props?.options?.find(
        (option) => option?.optionId === optionId
      );
      if (selectedOption) {
        dispatch(
          updateCheckOut({
            serviceId: props.serviceId,
            optionId: selectedOption.optionId,
            serviceName: selectedOption.optionName,
            finalPrice: selectedOption.salePrice,
            serviceDuration: selectedOption.duration,
          })
        );
      }
    });

    deselectedOptions.forEach((optionId) => {
      dispatch(
        resetCheckOut({
          serviceId: props.serviceId,
          optionId: optionId,
        })
      );
    });
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
    bgcolor: "background.paper",
    border: "2px",
    boxShadow: 24,
    maxWidth: "1145px",
    maxHeight: "680px",
    p: 4,
  };

  return (
    <div>
      <IconButton onClick={() => handleOpen()}>
        {selectAll ? <GetIcon iconName="SelectedIcon"/> : <GetIcon iconName="PlusIcon"/>}
        {/* <GetIcon iconName="PlusIcon" /> */}
      </IconButton>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="rounded-3xl max-w-7xl urbanist-font">
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <div className="flex flex-wrap p-6">
            <Grid className="w-full">
              <Text
                sx={styles.serviceName}
                name={props?.serviceName}
                align="left"
              />
              <Box
                className="flex justify-between items-end"
                sx={{
                  "@media (max-width: 640px)": {
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                }}
              >
                <div>
                  <Text
                    sx={styles.duration}
                    name={`${props?.serviceDuration} mins`}
                    align="left"
                  />
                  <div style={styles.startingPrice}>
                    {props?.options?.length > 0
                      ? `from $${props?.startingPrice}`
                      : `$${props?.finalPrice}`}
                  </div>
                </div>
                <Button
                  sx={styles.btn}
                  variant={selectAll ? "contained" : "outlined"}
                  startIcon={<GetIcon iconName="PlusIcon" />}
                  onClick={handleSelectAll}
                  disabled={!props?.options?.length} // Disable if no options available
                >
                  {selectAll ? "Deselect All" : "Select All"}
                </Button>
              </Box>
            </Grid>
            <Grid className="w-full mt-4">
              <Text
                sx={{
                  ...styles.description,
                  overflowWrap: "break-word",
                  wordWrap: "break-word",
                  hyphens: "auto",
                  maxWidth: "850px",
                }}
                name={props?.serviceDescription}
                align="left"
              />
            </Grid>
          </div>
          <div className="mx-6">
            <Divider />
          </div>
          {props?.options?.length > 0 && (
            <Grid container spacing={2} sx={{ margin: "5px", padding: "10px" }}>
              <Grid xs={12}>
                <Text
                  sx={styles.subHeading}
                  name={"Choose options"}
                  align="left"
                />
              </Grid>
              <Grid
                xs={12}
                className="service-options"
                sx={{ overFlowY: "scroll" }}
              >
                {props.options.map((option) => (
                  <Grid
                    className="py-2 flex justify-between"
                    key={option?.optionId}
                  >
                    <div>
                      <Text
                        sx={styles.optName}
                        name={option?.optionName}
                        align="left"
                      />
                      <Text
                        sx={styles.optDuration}
                        name={`${option?.duration} mins`}
                        align="left"
                      />
                      <Text
                        sx={styles.optPrice}
                        name={`$${option?.salePrice}`}
                        align="left"
                      />
                    </div>
                    <div className="px-16 py-4">
                      <CheckBox
                        optionId={option?.optionId}
                        isSelected={selectedOptions.includes(option?.optionId)}
                        onOptionSelect={() =>
                          handleOptionSelect(option?.optionId)
                        }
                      />
                    </div>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          )}
        </Box>
      </Modal>
    </div>
  );
}

export default OptionsModal;

const styles = {
  subHeading: {
    color: "#4D4D4D",
    fontSize: "28px",
    fontWeight: 700,
    paddingLeft: 0,
    paddingTop: 1,
  },
  serviceName: {
    color: "#4D4D4D",
    fontSize: "36px",
    fontWeight: 600,
    lineHeight: "42px",
    py: "1px",
    "@media (max-width: 430px)": {
      fontSize: "30px",
    },
    "@media (max-width: 385px)": {
      fontSize: "24px",
      fontWeight: 700,
    },
  },
  startingPrice: {
    color: "#4D4D4D",
    fontSize: "28px",
    fontWeight: 700,
    py: "1px",
    "@media (max-width: 430px)": {
      fontSize: "26px",
      fontWeight: 600,
    },
    "@media (max-width: 385px)": {
      fontSize: "24px",
      fontWeight: 600,
    },
  },
  duration: {
    color: "#808080",
    fontSize: "16px",
    fontWeight: 400,
    py: "1px",
  },
  description: {
    color: "#616161",
    fontSize: "20px",
    fontWeight: 400,
    py: "0px",
  },
  optName: {
    color: "#4D4D4D",
    fontSize: "20px",
    fontWeight: 600,
    py: "1px",
  },
  optPrice: {
    color: "#4D4D4D",
    fontSize: "18px",
    fontWeight: 700,
    py: "2px",
  },
  optDuration: {
    color: "#808080",
    fontSize: "16px",
    fontWeight: 400,
    py: "1px",
  },
  btn: {
    padding: "10px, 16px, 10px, 16px",
    borderRadius: "10px",
    textTransform: "none",
    fontSize: "20px",
    fontWeight: 500,
    "@media (max-width: 430px)": {
      fontSize: "18px",
    },
    "@media (max-width: 385px)": {
      fontSize: "14px",
      fontWeight: 500,
    },
  },
};
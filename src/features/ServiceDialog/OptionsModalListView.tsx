import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  Button,
  Box,
  Slide,
  Typography,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
// import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from "react-redux";
import {
  updateCheckOut,
  resetCheckOut,
} from "../../store/slices/checkOutPageSlice";
import GetIcon from "../../assets/Icon/icon";
import { useSelector } from "react-redux";
const Transition = React.forwardRef(function Transition(props: any, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function OptionsModalListView({ props, isMobile, onServiceClick, checkOutList, service, selectedService }) {
  const dispatch = useDispatch();

  const [propsVal, setPropsVal] = useState(props);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(selectedService);
  const [selectAll, setSelectAll] = useState(selectedService?.length === propsVal?.options?.length);
  const [isSelected, setSelected] = useState(false);
  const quickBook = useSelector((state: any) => state.quickBook);

  // useEffect(() => {
  //   if (isSelected) {
  //     setSelected(true);
  //   }
  // }, [isSelected, isSelectionValid]);

  useEffect(() => {
    if (quickBook?.selectedServiceId && propsVal?.options?.length > 1 && quickBook?.selectedServiceId === propsVal?.serviceId) {
      const filteredService = propsVal;
      setPropsVal(filteredService);

      if (!(selectedOptions.length > 0)) {
        handleSelectAll();
      }
    }
  }, [])

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
    if (selectedOptions.length === props.options.length) {
      setSelectedOptions([]);
    } else {
      setSelectedOptions(props.options.map((option) => option.optionId));
    }
  };

  const handleOptionToggle = (optionId) => {
    setSelectedOptions((prev) => {
      if (prev.includes(optionId)) {
        dispatch(resetCheckOut({ serviceId: props.serviceId, optionId }));
        return prev.filter((id) => id !== optionId);
      } else {
        const option = props.options.find(opt => opt.optionId === optionId);
        if (option) {
          dispatch(updateCheckOut({
            serviceId: props.serviceId,
            optionId: option.optionId,
            serviceName: option.optionName,
            finalPrice: option.salePrice,
            duration: option.duration || 0, // Ensure duration is always included, default to 0 if not available
          }));
        }
        return [...prev, optionId];
      }
    });
  };


  const updateReduxStore = () => {
    const deselectedOptions = props.options
      .filter((option) => !selectedOptions.includes(option.optionId))
      .map((option) => option.optionId);

    selectedOptions.forEach((optionId) => {
      const selectedOption = props.options.find(
        (option) => option.optionId === optionId
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

  return (
    <>
      <IconButton onClick={handleOpen}>
        {checkOutList?.checkOut?.some(
          (item) => item?.optionId === service?.options[0]?.optionId
        ) ? (
          <GetIcon iconName="SelectedIcon" />
        ) : (
          <GetIcon iconName="PlusIcon" />
        )}
      </IconButton>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        fullScreen={isMobile}
        TransitionComponent={Transition}
        PaperProps={{
          style: isMobile
            ? {
              margin: 0,
              height: "70%",
              maxHeight: "70%",
              position: "absolute",
              bottom: 0,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }
            : {},
        }}
      >
        <DialogTitle>
          {props.serviceName}
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            padding: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            {props.serviceDuration} mins
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            from ${props.startingPrice}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, mb: 2 }}>
            {props.serviceDescription}
            {/* <Button size="small">see more</Button> */}
          </Typography>
          <Divider />
          {!isMobile && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 2,
                mb: 1,
              }}
            >
              <Typography variant="subtitle1">Choose options</Typography>
              <Button
                variant={selectAll ? "contained" : "outlined"}
                startIcon={<GetIcon iconName="PlusIcon" />}
                onClick={handleSelectAll}
                disabled={!props.options?.length}
                sx={{
                  borderRadius: "8px",
                  textTransform: "none",
                }}
              >
                {selectAll ? "Deselect All" : "Select All"}
              </Button>
            </Box>
          )}
          <List sx={{ flexGrow: 1, overflowY: "auto" }}>
            {props.options.map((option, index) => (
              <ListItem
                key={index}
                dense
                button
                onClick={() => handleOptionToggle(option.optionId)}
              >
                <Checkbox
                  edge="start"
                  checked={selectedOptions.includes(option.optionId)}
                  tabIndex={-1}
                  disableRipple
                  icon={
                    <Box
                      sx={{
                        width: 20,
                        height: 20,
                        border: "2px solid #bdbdbd",
                        borderRadius: "4px",
                        backgroundColor: "white",
                      }}
                    />
                  }
                  checkedIcon={
                    <Box
                      sx={{
                        width: 20,
                        height: 20,
                        border: "2px solid #bdbdbd",
                        borderRadius: "4px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "white",
                      }}
                    >
                      <CheckIcon sx={{ color: "#4caf50", fontSize: 16 }} />
                    </Box>
                  }
                />
                <ListItemText
                  primary={option.optionName}
                  secondary={`${option.duration} mins - from $${option.salePrice}`}
                />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <Box
          sx={{
            position: "sticky",
            bottom: 0,
            backgroundColor: "background.paper",
            padding: 2,
            borderTop: "1px solid rgba(0, 0, 0, 0.12)",
          }}
        >
          <Box
            sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}
          >
            <Button
              variant={selectAll ? "contained" : "outlined"}
              startIcon={<GetIcon iconName="PlusIcon" />}
              onClick={handleSelectAll}
              disabled={!props.options?.length}
              sx={{
                flex: 1,
                borderRadius: "8px",
                textTransform: "none",
              }}
            >
              {selectAll ? "Deselect All" : "Select All"}
            </Button>
          </Box>
        </Box>
      </Dialog>
    </>
  );
}

export default OptionsModalListView;

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
// import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from "react-redux";
import {
  updateCheckOut,
  resetCheckOut,
} from "../../store/slices/checkOutPageSlice";
import GetIcon from "../../assets/Icon/icon";
const Transition = React.forwardRef(function Transition(props: any, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function OptionsModalListView({ props, isMobile }) {
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [isSelectionValid, setIsSelectionValid] = useState(false);
  const [isSelected, setSelected] = useState(false);

  useEffect(() => {
    if (isSelected) {
      setSelected(true);
    }
  }, [isSelected, isSelectionValid]);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSelectAll = () => {
    if (!selectAll) {
      const selected = props.options.map((option) => option.optionId);
      setSelectedOptions(selected);
      setSelectAll(true);
      setSelected(true);
    } else {
      setSelectedOptions([]);
      setSelectAll(false);
      setSelected(true);
    }
  };

  const handleOptionToggle = (optionId) => {
    setSelectedOptions((prev) =>
      prev.includes(optionId)
        ? prev.filter((id) => id !== optionId)
        : [...prev, optionId]
    );
    setSelected(true);
  };

  const handleSaveSelection = () => {
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
      const deselectedOption = props.options.find(
        (option) => option.optionId === optionId
      );
      if (deselectedOption) {
        dispatch(
          resetCheckOut({
            serviceId: props.serviceId,
            optionId: deselectedOption.optionId,
          })
        );
      }
    });

    setIsOpen(false);
  };

  return (
    <>
      <IconButton onClick={handleOpen}>
        <GetIcon iconName="PlusIcon" />
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
                  sx={{ "&.Mui-checked": { color: "green" } }}
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
          {isMobile ? (
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
              <Button
                variant="contained"
                onClick={handleSaveSelection}
                disabled={!isSelected}
                sx={{
                  flex: 1,
                  backgroundColor: "#8B5CF6",
                  "&:hover": {
                    backgroundColor: "#7C3AED",
                  },
                  borderRadius: "8px",
                  textTransform: "none",
                }}
              >
                Save Selection
              </Button>
            </Box>
          ) : (
            <Button
              variant="contained"
              onClick={handleSaveSelection}
              disabled={!isSelected}
              fullWidth
              sx={{
                backgroundColor: "#8B5CF6",
                "&:hover": {
                  backgroundColor: "#7C3AED",
                },
                borderRadius: "8px",
                textTransform: "none",
              }}
            >
              Save Selection
            </Button>
          )}
        </Box>
      </Dialog>
    </>
  );
}

export default OptionsModalListView;

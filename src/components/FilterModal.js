import * as React from "react";
import GetIcon from "../assets/Icon/icon.tsx";

import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import { Chip, Divider, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Slider from "@mui/material/Slider";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import Button from "../components/Button";
import { resetFilter, UpdateFilter } from "../store/slices/filterModal.js";
import Buttons from "@mui/material/Button";
import { Grid } from "@mui/material";

export default function FilterModal() {
  const { SortBy, price, selectedTags } = useSelector(
    (state) => state.filterModal
  );
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);

  const predefinedTags = [
    "unisex",
    "female only",
    "male only",
    "kids",
    "Instant booking",
    "Free Cancellations",
  ];

  const sortByListItem = [
    "Recommended",
    "Nearest Location",
    "Ratings",
    "Price",
  ];

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const schema = yup
    .object()
    .shape({
      SortBy: yup.string().required(),
      price: yup.number().required(),
      tags: yup.array(),
    })
    .required();

  const { control, reset, getValues } = useForm({
    defaultValues: {
      SortBy: SortBy,
      price: [price.min, price.max],
      selectedTags: selectedTags,
    },
    resolver: yupResolver(schema),
  });

  const onclickTag = (tag, value, onChange) => {
    const updatedTags = value.includes(tag)
      ? value.filter((selectedTag) => selectedTag !== tag)
      : [...value, tag];
    onChange(updatedTags);
  };

  const onClickApplyFilter = (values) => {
    const { SortBy, price, selectedTags } = values;
    const data = {
      SortBy: SortBy,
      price: price,
      selectedTags: selectedTags,
    };
    dispatch(UpdateFilter(data));
    handleOpen();
  };

  const onClickClearFilter = () => {
    dispatch(resetFilter());
    reset();
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "2px",
    boxShadow: 24,
    p: 4,
    borderradius: "2px",
  };

  return (
    <div>
      <Buttons
        onClick={handleOpen}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          "@media (max-width: 600px)": {
            marginTop: "4px",
          },
        }}
      >
        <TuneRoundedIcon className="text-black" />
        <Box
          sx={{
            position: "relative",
            display: "inline-flex",
            alignItems: "center",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              marginRight: "8px",
              marginLeft: "8px",
              color: "#4D4D4D",
              textTransform: "none",
              fontSize: "20px",
              fontWeight: 600,
            }}
          >
            Filter
          </Typography>
          <Chip
            label={2}
            size="small"
            color="primary"
            sx={{
              position: "absolute",
              top: "-8px",
              right: "-12px",
              height: "20px",
              fontSize: "0.75rem",
              fontWeight: "bold",
              backgroundColor: "red",
              "& .MuiChip-label": {
                padding: "0 6px",
              },
            }}
          />
        </Box>
      </Buttons>
      <Modal
        open={open}
        onClose={handleOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="rounded-3xl filter-box p-4 md:p-6">
          <div className="flex justify-between items-center mb-3">
            <div id="title" className="font-bold text-xl">
              Filters
            </div>
            <GetIcon
              iconName="CloseIcon"
              onClick={handleOpen}
              className="cursor-pointer"
            />
          </div>
          <Grid container spacing={2} className="filters-container">
            <Grid item xs={12}>
              <div className="font-bold mb-2">Sort by</div>
              <form>
                <Controller
                  name="SortBy"
                  control={control}
                  render={({ field }) => (
                    <div className="space-y-3">
                      {sortByListItem?.map((item, index) => {
                        return (
                          <SortByItem
                            {...field}
                            key={index}
                            labelName={item}
                          ></SortByItem>
                        );
                      })}
                    </div>
                  )}
                />
                <br></br>
                <Divider></Divider>
                <div className="font-bold mb-2 mt-3">Price</div>
                <Controller
                  name="price"
                  className="ml-4 mr-4"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <div className="mb-4 ml-6 mr-6">
                      <Slider
                        sx={{ color: "#965AE5" }}
                        value={value}
                        onChange={(_, newValue) => onChange(newValue)}
                        valueLabelDisplay="auto"
                        getAriaLabel={() => "price range"}
                        disableSwap
                      />
                      <div className="flex justify-between items-center">
                        <span>${value[0]}</span>
                        <span>${value[1]}</span>
                      </div>
                    </div>
                  )}
                />

                <Divider />
                <div className="mt-2 mb-2">
                  <Controller
                    name="selectedTags"
                    control={control}
                    defaultValue={["kids"]}
                    render={({ field: { onChange, value } }) => (
                      <div>
                        {predefinedTags.map((tag) => (
                          <button
                            key={tag}
                            type="button"
                            className={`border border-black ${
                              value.includes(tag)
                                ? "bg-[#E6E1FF] text-black"
                                : "bg-white text-black"
                            } rounded-3xl px-4 py-2 m-2 cursor-pointer`}
                            onClick={() => onclickTag(tag, value, onChange)}
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    )}
                  />
                </div>

                <Divider />

                <div className="space-x-4 mt-3">
                  <Button
                    variant="outlined"
                    onClick={onClickClearFilter}
                    name="Clear All"
                    sx={styles.btn}
                  />
                  <Button
                    name="Apply Filters"
                    onClick={() => {
                      onClickApplyFilter(getValues());
                    }}
                    sx={styles.btn}
                  ></Button>
                </div>
              </form>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}

const SortByItem = React.forwardRef((props, ref) => {
  const { labelName, value, onChange, ...rest } = props;
  return (
    <>
      <div className="flex justify-between items-center">
        <label htmlFor={labelName}>{labelName}</label>
        <input
          ref={ref}
          name={"SortBy"}
          id={labelName}
          className="text-xl h-6 w-6"
          type="radio"
          value={value}
          checked={value.toLowerCase() === labelName.toLowerCase()} // Set defaultChecked
          onChange={() => onChange(labelName)}
          {...rest}
        />
      </div>
    </>
  );
});

const styles = {
  btn: {
    color: "#FFFFFF",
    backgroundColor: "#825FFF",
    fontWeight: 600,
    fontSize: "16px",
    lineHeight: "24px",
    padding: "10px 40px 10px 40px",
    borderRadius: "10px",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#5A3EBF",
    },
  },
};

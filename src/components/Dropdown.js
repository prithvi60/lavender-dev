import React from "react";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

const Dropdown = (props) => {
  const { label, variant, required, value, onChange, options, ...rest } = props;

  const getOptions = () => {
    return options?.map((option, index) => {
      return (
        <MenuItem
          key={index}
          value={option?.value}
          style={{ textAlign: "left" }}
        >
          {option?.label}
        </MenuItem>
      );
    });
  };

  return (
    <FormControl
      variant={variant ?? "standard"}
      fullWidth
      required={required ?? true}
    >
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        onChange={onChange}
        label={label}
        style={{ textAlign: "left" }}
        {...rest}
      >
        {getOptions()}
      </Select>
    </FormControl>
  );
};

export default Dropdown;

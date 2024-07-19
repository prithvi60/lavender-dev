import React from "react";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { WEBSITE_TITLE } from "../constants/constants";

export const Copyright = (props) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link to="/" variant="body2" color="primary">
        {WEBSITE_TITLE}
      </Link>
      {` ${new Date().getFullYear()}.`}
    </Typography>
  );
};

export default Copyright;

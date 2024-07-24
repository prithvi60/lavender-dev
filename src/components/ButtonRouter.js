import { Link } from "react-router-dom";
import React from "react";
import Button from "./Button";

const ButtonRouter = (props) => {
  const { to, variant, ...rest } = props;

  return (
    <Link to={to}>
      <Button variant={variant ?? "contained"} {...rest} disableRipple />
    </Link>
  );
};

export default ButtonRouter;

import { Link } from "react-router-dom";
import React from "react";
import Button from "./Button";

const ButtonRouter = (props) => {
  const { to, ...rest } = props;

  return (
    <Link to={to}>
      <Button {...rest} />
    </Link>
  );
};

export default ButtonRouter;

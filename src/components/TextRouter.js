import { Link } from "react-router-dom";
import React from "react";
import Text from "./Text";

const TextRouter = (props) => {
  const { to, ...rest } = props;

  return (
    <Link to={to}>
      <Text {...rest} />
    </Link>
  );
};

export default TextRouter;

import React from "react";
import PropTypes from "prop-types";

import { RadioChildStyle } from "./styled";

export const RadioChild = (props) => {
  RadioChild.propTypes = {
    name: PropTypes.string,
  };
  return <RadioChildStyle>{props.childern}</RadioChildStyle>;
};

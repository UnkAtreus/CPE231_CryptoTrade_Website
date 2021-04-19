import React from "react";
import PropTypes from "prop-types";

import { DropdownChildStyle } from "./styled";

export const DropdownChild = (props) => {
  DropdownChild.propTypes = {
    name: PropTypes.string,
  };
  return <DropdownChildStyle>{props.childern}</DropdownChildStyle>;
};

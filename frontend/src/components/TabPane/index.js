import React from "react";
import PropTypes from "prop-types";

import { TabPaneStyle } from "./styled";

export const TabPane = (props) => {
  TabPane.propTypes = {
    name: PropTypes.string,
  };
  return <TabPaneStyle>{props.childern}</TabPaneStyle>;
};

import React from "react";
import ClassNames from "classnames";
import PropTypes from "prop-types";
import { ButtonStyle } from "./styled";

export const Button = ({ match, ...props }) => {
  Button.propTypes = {
    className: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    color: PropTypes.oneOf(["green", "purple", "red"]),
    fontColor: PropTypes.oneOf(["green", "purple", "red", "white", "black"]),
    size: PropTypes.oneOf(["label","paragraph","title"]),
    style: PropTypes.object,
  };

  Button.defaultProps = {
    color: "green",
    fontColor: "white",
    size: "label",
  };

  const CheckColor = () => {
    switch (props.color) {
      case "green":
        return "bg-green";
      case "red":
        return "bg-red";
      case "purple":
        return "bg-purple";
      default:
        return "bg-purple";
    }
  };

  const CheckSize = () => {
    switch (props.size) {
      case "label":
        return "height-32";
      case "paragraph":
        return "height-48";
      case "title":
        return "height-64";
      default:
        return "height-32";
    }
  };

  return (
    <ButtonStyle
      onClick={()=> {}}
      className={ClassNames("container", CheckColor(),CheckSize())}
      style={props.style}
    >
      <div className={ClassNames(props.fontColor, props.size)}>
        {props.label}
      </div>
    </ButtonStyle>
  );
};

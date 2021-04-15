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
    style: PropTypes.object,
  };

  Button.defaultProps = {
    color: "green",
    fontColor: "white",
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

  return (
    <ButtonStyle
      onClick={console.log("test")}
      className={ClassNames("container", CheckColor())}
      style={props.style}
    >
      <div className={ClassNames("paragraph ", props.fontColor)}>
        {props.label}
      </div>
    </ButtonStyle>
  );
};

import React, { useState } from "react";
import PropTypes from "prop-types";
import ClassNames from "classnames";

import { InputStyle } from "./styled";

export const Input = ({ match, ...props }) => {
  const [name, setname] = useState("");

  Input.propTypes = {
    className: PropTypes.string,
    placeholder: PropTypes.string,
    title: PropTypes.string,
    type: PropTypes.string,
  };

  return (
    <InputStyle className={ClassNames(props.className)}>
      <div className="content-row">
        <div className="label white">{props.title}</div>
      </div>
      <div
        className="content-row align-items-center justify-content-center"
        style={{ width: "100%", height: "32px" }}
      >
        <input
          type={props.type || "text"}
          placeholder={props.placeholder || "0"}
          value={name}
          onChange={(e) => {
            setname(e.target.value);
          }}
        />
      </div>
    </InputStyle>
  );
};

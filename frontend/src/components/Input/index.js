import React, { useState } from "react";
import PropTypes from "prop-types";
import ClassNames from "classnames";

import { InputStyle, InputField } from "./styled";

export const Input = ({ match, ...props }) => {
  const [name, setname] = useState(props.value || "");

  Input.propTypes = {
    className: PropTypes.string,
    placeholder: PropTypes.string,
    title: PropTypes.string,
    type: PropTypes.string,
  };

  const onNameChange = (data) => {
    // for a date field, the value is passed into the change handler
    props.onChange(data);
    // console.log(props);
  };

  return (
    <InputStyle className={ClassNames(props.className)} style={props.style}>
      <div className="content-row">
        <div className="label white">{props.title}</div>
      </div>
      <InputField>
        <div
          className="content-row align-items-center justify-content-center"
          style={{ width: "100%", height: "32px" }}
        >
          <div className="prefix-container mgl-16 gray">{props.prefix}</div>
          <input
            type={props.type || "text"}
            placeholder={props.placeholder || "0"}
            value={name}
            autoComplete="new-password"
            onChange={(e) => {
              setname(e.target.value);
              onNameChange(e.target.value);
            }}
          />
          <div className="suffix-container mgr-16 white">{props.suffix}</div>
        </div>
      </InputField>
    </InputStyle>
  );
};

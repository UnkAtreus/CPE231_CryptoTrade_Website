import React, { useState } from "react";
import ClassNames from "classnames";
import { InputTradeStyle } from "./styled";

export const InputTrade = ({ match, ...props }) => {
  const [name, setname] = useState(props.value || "0");

  return (
    <InputTradeStyle className={ClassNames(props.className)}>
      <div
        className="content-row align-items-center justify-content-center"
        style={{ width: "100%" }}
      >
        <div className="prefix-container mgl-16 gray">{props.prefix}</div>
        <input
          disabled={props.disabled || false}
          type="text"
          placeholder={props.placeholder || "0"}
          value={name}
          onChange={(e) => {
            setname(e.target.value);
          }}
        />
        <div className="suffix-container mgr-16 gray">{props.suffix}</div>
      </div>
    </InputTradeStyle>
  );
};

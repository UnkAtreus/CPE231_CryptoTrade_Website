import React, { useState } from "react";
import PropTypes from "prop-types";

import { InputTradeStyle } from "./styled";

export const InputTrade = (props) => {
  const [name, setname] = useState("0");

  InputTrade.propTypes = {
    className: PropTypes.string,
    placeholder: PropTypes.string,
    title: PropTypes.string,
    prefix: PropTypes.string,
    suffix: PropTypes.string,
  };

  return (
    <InputTradeStyle>
      <div
        className="content-row align-items-center justify-content-center"
        style={{ width: "100%" }}
      >
        <div className="prefix-container mgl-16 gray">{props.prefix}</div>
        <input
          type="text"
          placeholder={props.placeholder || "0"}
          value={name}
          onChange={(e) => setname(e.target.value)}
        />
        <div className="suffix-container mgr-16 gray">{props.suffix}</div>
      </div>
    </InputTradeStyle>
  );
};

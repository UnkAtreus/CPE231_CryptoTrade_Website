import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ClassNames from "classnames";

import { ValueStepStyle } from "./styled";

export const ValueStep = ({ match, ...props }) => {
  const [active, setActive] = useState(0);
  const [rangeStep, setRangeStep] = useState(["25", "50", "75", "100"]);

  const changeStep = (step) => {
    setActive(step);
  };

  return (
    <ValueStepStyle>
      <div
        className="content-row space-between"
        style={{ display: "inline-flex", gap: "8px", width: "100%" }}
      >
        {rangeStep.map((data, index) => {
          return (
            <div
              key={index}
              className={ClassNames(
                "content-column text-center",
                index === active ? "active" : ""
              )}
              style={{ width: "100%", cursor: "pointer" }}
              onClick={() => changeStep(index)}
            >
              <div
                className={ClassNames(
                  "step mgb-2",
                  index === active ? "bg-purple" : "bg-gray"
                )}
              />
              <div
                className={ClassNames(
                  "label",
                  index === active ? "white" : "gray"
                )}
              >
                {data} %
              </div>
            </div>
          );
        })}
      </div>
    </ValueStepStyle>
  );
};

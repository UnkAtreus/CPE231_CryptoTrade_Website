import React, { useState } from "react";
import ClassNames from "classnames";

import { ValueStepStyle } from "./styled";

export const ValueStep = ({ match, ...props }) => {
  const [active, setActive] = useState(0);
  const [rangeStep] = useState(["25", "50", "75", "100"]);

  const changeStep = (step) => {
    if (step === active) {
      setActive(0);
      props.value(0);
    } else {
      setActive(step);
      props.value(step);
    }
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
                index + 1 === active ? "active" : ""
              )}
              style={{ width: "100%", cursor: "pointer" }}
              onClick={() => changeStep(index + 1)}
            >
              <div
                className={ClassNames(
                  "step mgb-2",
                  index + 1 <= active ? "bg-purple" : "bg-gray"
                )}
              />
              <div
                className={ClassNames(
                  "label",
                  index + 1 === active ? "white" : "gray"
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

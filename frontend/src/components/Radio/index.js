import React, { useEffect, useState } from "react";
import { RadioChild } from "../RadioChild";
import ClassNames from "classnames";
import PropTypes from "prop-types";

import { RadioStyle, RadioHeader, RadioChildStyle } from "./styled";

export const Radio = (props) => {
  const { children } = props;
  const [radioHeader, setRadioHeader] = useState([]);
  const [active, setActive] = useState("");

  useEffect(() => {
    const headers = [];
    const childCnt = {};
    React.Children.forEach(children, (element) => {
      if (!React.isValidElement(element)) return;
      const { name } = element.props;
      headers.push(name);
      childCnt[name] = element.props.children;
    });
    setRadioHeader(headers);
    setActive(headers[0]);
    console.log(headers);
  }, [props, children]);

  const changeTab = (name) => {
    setActive(name);
  };

  const changePostion = (pos) => {
    // console.log("pos" , props.position);
    // if (pos === "row"){
    //   return "display-row";
    // }else if (pos === "column") {
    //   return "display-column";
    // }
    
    if (pos === "row"){
      return {
        display: "inline-flex",
        columnGap: props.gap,
        width: "100%",
        alignItems: "center"
      }
    }else if (pos === "column")
      return {
        display: "grid",
        gap: props.gap,
      }
  };

  return (
    <RadioStyle>
      <RadioHeader style={changePostion(props.position)}>
        {radioHeader.map((item, index) => (
          <RadioChildStyle
            className={ClassNames(item === active ? "active" : "") }
            onClick={() => changeTab(item)}
            key={index}
          >
            <div className={item === active ? "label white" : "label gray"}>
              {item}
            </div>
          </RadioChildStyle>
        ))}
      </RadioHeader>
    </RadioStyle>
  );
};

Radio.propTypes = {
  position: PropTypes.oneOf(["row", "column"]),
  gap: PropTypes.number,
  children: function (props, propName, componentName) {
    const prop = props[propName];

    let error = null;
    React.Children.forEach(prop, function (child) {
      if (child.type !== RadioChild) {
        error = new Error(
          "`" + componentName + "` children should be of type `RadioChild`."
        );
      }
    });
    return error;
  },
};

Radio.defaultProps = {
  position: "row",
  gap: 16,
};

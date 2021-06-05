import React, { useEffect, useState } from "react";
import { TabPane } from "../TabPane";

import { TabStyle, TabHeader } from "./styled";

export const Tab = React.memo(
  (props) => {
    const { children } = props;
    const [tabHeader, setTabHeader] = useState([]);
    const [childContent, setChildConent] = useState({});
    const [active, setActive] = useState(props.active);

    useEffect(() => {
      const headers = [];
      const childCnt = {};
      React.Children.forEach(children, (element) => {
        if (!React.isValidElement(element)) return;
        const { name } = element.props;
        headers.push(name);
        childCnt[name] = element.props.children;
      });
      setTabHeader(headers);
      setChildConent({ ...childCnt });
    }, [props, children]);

    const changeTab = (name) => {
      setActive(name);
    };

    return (
      <TabStyle>
        <TabHeader>
          {tabHeader.map((item, index) => (
            <li
              onClick={() => changeTab(item)}
              key={index}
              className={item === active ? "pointer active" : "pointer "}
            >
              {item}
            </li>
          ))}
        </TabHeader>
        <div className="tab-content">
          {Object.keys(childContent).map((key, index) => {
            if (key === active) {
              return (
                <div className="tab-child" key={index}>
                  {childContent[key]}
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
      </TabStyle>
    );
  },
  function areEqual(prevProps, nextProps) {
    if (prevProps.children !== nextProps.children) {
      return false;
    }
    return true;
  }
);

Tab.propTypes = {
  children: function (props, propName, componentName) {
    const prop = props[propName];

    let error = null;
    React.Children.forEach(prop, function (child) {
      if (child.type !== TabPane) {
        error = new Error(
          "`" + componentName + "` children should be of type `TabPane`."
        );
      }
    });
    return error;
  },
};

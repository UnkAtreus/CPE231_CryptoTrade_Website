import React, { useEffect, useState } from 'react'
import { TabPane } from '../TabPane'

import {
  TabStyle,
  TabHeader
} from './styled'

export const Tab = (props) => {
  const { children } = props;
  const [tabHeader, setTabHeader] = useState([]);
  const [childContent, setChildConent] = useState({});
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
    setTabHeader(headers);
    setActive(headers[0]);
    setChildConent({ ...childCnt });
    console.log(childCnt);
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
            className={item === active ? "active" : ""}
          >
            {item}
          </li>
        ))}
      </TabHeader>
      <div className="tab-content">
        {Object.keys(childContent).map((key, index) => {
          if (key === active) {
            return <div className="tab-child" key={index}>{childContent[key]}</div>;
          } else {
            return null;
          }
        })}
      </div>
    </TabStyle>
  );
};

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
  }
};

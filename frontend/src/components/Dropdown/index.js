import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ClassNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { DropdownChild } from "../DropdownChild";

import {
  DropdownStyle,
  DropdownField,
  DropdownHeader,
  DropdownContent,
} from "./styled";

export const Dropdown = (props) => {
  const { children } = props;
  const [isOpen, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [childContent, setChildContent] = useState({});

  const toggleDropdown = () => {
    setOpen(!isOpen);
  };

  const handleItemClick = (key) => {
    if (!props.isSelect) {
      selectedItem === key ? setSelectedItem(null) : setSelectedItem(key);
      setOpen(!isOpen);
      props.onChange(selectedItem === key ? null : childContent[key]);
    } else {
      setSelectedItem(key);
      setOpen(!isOpen);
      props.onChange(key);
    }
  };

  useEffect(() => {
    const childCnt = {};
    React.Children.forEach(children, (element) => {
      if (!React.isValidElement(element)) return;
      const { name } = element.props;
      childCnt[name] = element.props.children;
    });
    setChildContent({ ...childCnt });
    if (props.isSelect) setSelectedItem(props.active);
    // console.log(childCnt);
  }, [props, children]);

  return (
    <DropdownStyle className={ClassNames(props.className)} style={props.style}>
      <div className="content-row">
        <div className="label white">{props.title}</div>
      </div>
      <DropdownHeader onClick={toggleDropdown}>
        <div
          className="content-row align-items-center justify-content-center"
          style={{ width: "100%", height: "32px" }}
        >
          <div className="prefix-container mgl-16 gray">{props.prefix}</div>
          <div className="dropdown-header">
            {selectedItem ? childContent[selectedItem] : "Select"}
          </div>
          <div className="suffix-container mgr-16 gray">
            <FontAwesomeIcon icon={faChevronDown} />
          </div>
        </div>
      </DropdownHeader>
      <DropdownField className={ClassNames(isOpen && "open")}>
        <DropdownContent>
          {Object.keys(childContent).map((key, index) => {
            return (
              <div
                className="dropdown-item"
                onClick={() => handleItemClick(key)}
                key={index}
              >
                {childContent[key]}
              </div>
            );
          })}
        </DropdownContent>
      </DropdownField>
    </DropdownStyle>
  );
};

Dropdown.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.string,
  style: PropTypes.object,
  children: function (props, propName, componentName) {
    const prop = props[propName];

    let error = null;
    React.Children.forEach(prop, function (child) {
      if (child.type !== DropdownChild) {
        error = new Error(
          "`" + componentName + "` children should be of type `DropdownChild`."
        );
      }
    });
    return error;
  },
};

import React from "react";
import PropTypes from "prop-types";
import styles from "./navigation-link.module.css";

function NavigationLink(props) {
  return (
    <a href="#" className={`${styles.navigationLink} pl-5 pr-5 pt-4 pb-4`}>
      {props.children}
    </a>
  );
}

NavigationLink.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
};

export { NavigationLink };

import React from "react";
import styles from "./navigation-link.module.css";

function NavigationLink(props) {
  return (
    <a href="#" className={`${styles.navigationLink} pl-5 pr-5 pt-4 pb-4`}>
      {props.icon}
      {props.children}
    </a>
  );
}

export { NavigationLink };

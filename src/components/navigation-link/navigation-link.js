import React from "react";
import styles from "./navigation-link.module.css";

class NavigationLink extends React.Component {
  render() {
    return (
      <a href="#" className={`${styles.navigationLink} pl-5 pr-5 pt-4 pb-4`}>
        {this.props.icon}
        {this.props.children}
      </a>
    );
  }
}

export { NavigationLink };

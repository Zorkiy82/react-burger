import React from "react";
import styles from "./navigation-link.module.css";


class NavigationLink extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <div className={`${styles.navigationLink} pl-5 pr-5 pt-4 pb-4`}>

          {/* <BurgerIcon type="primary" /> */}
          {this.props.icon}
          {/* <ListIcon type="primary" /> */}
          {this.props.children}

      </div>
    );
  }
}

export { NavigationLink };

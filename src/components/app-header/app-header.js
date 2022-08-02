import React from "react";
import styles from './app-header.module.css'
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
class AppHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header className="pb-4 pt-4">

        <Logo />
      </header>

    )

  }
}

export { AppHeader };

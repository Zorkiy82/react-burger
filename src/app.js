import React from "react";
import { AppHeader } from "./components/app-header/app-header";
import styles from './styles.module.css'

// import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'

function App() {
  return (
    <div className={styles.app}>
      <AppHeader />
    </div>
  );
}

export default App;

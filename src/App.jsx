import React from 'react';
import { Form, List, Logo } from './components';
import styles from './App.module.scss';

const App = () => (
  <div className={styles.body}>
    <div className={styles.container}>
      <Logo />
      <Form />
      <List />
    </div>
  </div>
);

export default App;

import React from 'react';
import { useSelector } from "react-redux";
import { Form, List, Logo, Login } from './components';
import styles from './App.module.scss';


const App = () => {
  const auth = useSelector(({ firebase }) => firebase.auth);
  const authenticated = !auth.isEmpty;

  return (
    <>
      <Login authenticated={authenticated} />
      {authenticated && (
        <div className={styles.body}>
          <div className={styles.container}>
            <Logo />
            <Form />
            <List />
          </div>
        </div>
      )}
    </>
  );
}

export default App;

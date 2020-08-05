import React, { useState } from 'react';
import { useFirebase } from 'react-redux-firebase';
import styles from './Login.module.scss';

const Login = ({ authenticated }) => {
  const firebase = useFirebase();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLogout = () => {
    firebase.logout();
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSendForm = (e) => {
    e.preventDefault();

    firebase.login({ email, password })
      .then(() => {
        setLoginError('');
      })
      .catch(() => {
        setLoginError('Wrong emails/password. Please try again.');
      });
  };

  if(authenticated) {
    return (
      <button
        className={styles.logoutButton}
        onClick={handleLogout}
      >
        Logout
      </button>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.form}>
        {loginError && (
          <div className={styles.error}>
            {loginError}
          </div>
        )}
        <form onSubmit={handleSendForm}>
          <div className={styles.row}>
            <label htmlFor="email">Email:</label><br />
            <input
              onChange={handleEmailChange}
              type="email"
              id="email"
              name="email"
              value={email}
            />
          </div>

          <div className={styles.row}>
            <label htmlFor="password">Password:</label><br />
            <input
              onChange={handlePasswordChange}
              type="password"
              id="password"
              name="password"
              value={password}
            />
          </div>

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;

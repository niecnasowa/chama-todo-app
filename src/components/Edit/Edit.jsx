import React from 'react';
import Form from '../Form';
import styles from './Edit.module.scss';

const Edit = ({ item, onFinish }) => (
  <div className={styles.wrapper}>
    <button className={styles.close} onClick={onFinish}>
      Close
    </button>
    <Form  item={item} onFinish={onFinish} />
  </div>
);

export default Edit;

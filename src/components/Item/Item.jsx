import React, { useState } from 'react';
import classnames from 'classnames';
import { useFirebase } from 'react-redux-firebase';
import Edit from '../Edit';
import { formatTime } from '../../helpers';
import styles from './Item.module.scss';

const Item = ({ item, item: { id, name, completed, priority, time } }) => {
  const firebase = useFirebase();

  const [idToEdit, setIdToEdit] = useState(null);
  
  const handleComplete = () => {
    firebase.update(`todos/${id}`, { completed: true });
  };

  const handleEditFinish = () => {
    setIdToEdit(null);
  };

  const handleEdit = () => {
    setIdToEdit(id);
  };

  const handleDelete = () => {
    return firebase.remove(`todos/${id}`);
  };

  const { timeType, timeString } = formatTime(time);

  return (
    <>
      {idToEdit && <Edit item={item} onFinish={handleEditFinish} />}
      <div className={classnames(styles.item, completed && styles.completed)}>
        <div className={styles.name}>
          {name}
        </div>

        <div className={styles.actions}>
          <div className={styles.priority}>
            P: { priority }
          </div>
          <div className={classnames(styles.time, styles[timeType], completed && styles.timeCompleted)}>
            <span role="img" aria-labelledby="time">⏰</span> {timeString}
          </div>
          <div>
            {!completed && (
              <>
                <button className={styles.button} onClick={handleComplete}>Complete</button>
                <button className={styles.button} onClick={handleEdit}>Edit</button>
              </>
            )}
            <button className={styles.button} onClick={handleDelete}>Delete</button>
          </div>
        </div>        
      </div>
    </>
  );
};

export default Item;

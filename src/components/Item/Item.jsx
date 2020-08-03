import React, { useState } from 'react';
import classnames from 'classnames'
import { useDispatch } from "react-redux";
import { completeTodo, deleteTodo } from '../../redux/actions';
import Edit from '../Edit';
import { formatTime } from '../../helpers';
import styles from './Item.module.scss';

const Item = ({ item, item: { id, name, completed, priority, time } }) => {
  const dispatch = useDispatch();

  const [idToEdit, setIdToEdit] = useState(null);
  
  const handleComplete = () => {
    dispatch(completeTodo(id));
  };

  const handleEditFinish = () => {
    setIdToEdit(null);
  };

  const handleEdit = () => {
    setIdToEdit(id);
  };

  const handleDelete = () => {
    dispatch(deleteTodo(id));
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

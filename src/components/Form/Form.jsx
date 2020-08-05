import React, { useState } from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import { useFirebase } from 'react-redux-firebase';
import validation from './validation';
import styles from './Form.module.scss';

import "react-datepicker/dist/react-datepicker.css";

const Form = ({ item, onFinish }) => {
  const firebase = useFirebase();

  const [name, setName] = useState(item ? item.name : '');
  const [priority, setPriority] = useState(item ? item.priority : 1);
  const [time, setTime] = useState(item ? moment(item.time).toDate() :  moment().add(30, 'minutes').toDate());

  const [error, setError] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };

  const handleTimeChange = (time) => {
    setTime(time);
  };

  const handleSendForm = (e) => {
    e.preventDefault();

    const newItem = {
      name,
      priority,
      time: moment(time).format(),
      completed: false,
    };

    const error = validation(newItem);
    setError(error);

    if(!error) {
      if(item) {
        firebase.update(`todos/${item.id}`, newItem);
      }

      if(!item) {
        firebase.push('todos', newItem)
        setName('');
        setPriority(1);
      }

      if(onFinish) {
        onFinish();
      }
    }
  };

  return (
    <div className={styles.form}>
      {error && (
        <div className={styles.error}>
          {error}
        </div>
      )}

      <div className={styles.title}>
        {item ? 'Edit your To-Do' : 'Add your To-Do'}
      </div>
      <form onSubmit={handleSendForm}>
        <div className={styles.row}>
          <label htmlFor="name">Name:</label><br />
          <input
            onChange={handleNameChange}
            type="text"
            id="name"
            name="name"
            value={name}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="priority">Priority:</label><br />
          <input
            onChange={handlePriorityChange}
            type="number"
            id="priority"
            name="priority"
            value={priority}
          />
        </div>


        <div className={styles.row}>
          {/* Weird name, because I don't want fighting with browser autocomplete */}
          <label htmlFor="time-for-todo">Time:</label><br />
          <DatePicker
            id="time-for-todo"
            name="time-for-todo"
            onChange={handleTimeChange}
            selected={time}
            showTimeSelect
            dateFormat="dd-MM-yyyy h:mm aa"
          />
        </div>

        <button type="submit">{item ? 'Save' : 'Add'}</button>
      </form>
    </div>
  );
};

export default Form;

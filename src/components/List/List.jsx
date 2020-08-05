import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { useFirebaseConnect } from 'react-redux-firebase';
import { formatTime } from '../../helpers';
import Item from '../Item';

const List = () => {
  useFirebaseConnect(['todos']);
  const todosData = useSelector((state) => state.firebase.ordered.todos);

  // 'Hack' for refreshing list every minute
  const [fakeCurrentDate, setFakeCurrentDate] = useState(new Date());
  useEffect(() => {
    const timer = setTimeout(() => setFakeCurrentDate(new Date()), 60000);

    return () => { clearTimeout(timer); };
  }, [fakeCurrentDate]);

  if(!todosData) {
    return null;
  }

  const todos = todosData.map(({ key, value }) => ({ id: key, ...value}));

  todos.sort((a, b) => (b.priority - a.priority));

  const unCompletedTodos = todos.filter(({ completed }) => !completed);
  const completedTodos = todos.filter(({ completed }) => completed);

  const shouldPlayNotification =
    unCompletedTodos.some(({ time }) => formatTime(time).timeType === 'veryClose');

  if(shouldPlayNotification) {
    const ping = new Audio("/ping.mp3");
    ping.play();
  }

  return (
    <div>
      {!!unCompletedTodos.length && 'To-Do:'}
      {unCompletedTodos.map(todo => (<Item key={todo.id} item={todo} />))}
      {!!completedTodos.length && 'Done:'}
      {completedTodos.map(todo => (<Item key={todo.id} item={todo} />))}
    </div>
  );
};

export default List;

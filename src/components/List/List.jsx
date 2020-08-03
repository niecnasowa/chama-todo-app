import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { formatTime } from '../../helpers';
import Item from '../Item';


const List = () => {
  const todos = useSelector(state => state.todos);

  // 'Hack' for refreshing list every minute
  const [fakeCurrentDate, setFakeCurrentDate] = useState(new Date());
  useEffect(() => {
    setTimeout(() => setFakeCurrentDate(new Date()), 60000);
  }, [fakeCurrentDate]);

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

import React  from 'react';
import { useSelector } from "react-redux";
import { useFirebaseConnect } from 'react-redux-firebase';
import Item from '../Item';

const List = () => {
  useFirebaseConnect(['todos']);
  const todosData = useSelector(({ firebase }) => firebase.ordered.todos);

  if(!todosData) {
    return null;
  }

  const todos = todosData.map(({ key, value }) => ({ id: key, ...value}));

  todos.sort((a, b) => (b.priority - a.priority));

  const unCompletedTodos = todos.filter(({ completed }) => !completed);
  const completedTodos = todos.filter(({ completed }) => completed);

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

export const addTodo = item => ({
  type: 'ADD_TODO',
  id: Date.now(),
  item,
});

export const editTodo = item => ({
  type: 'EDIT_TODO',
  item,
});

export const deleteTodo = id => ({
  type: 'DELETE_TODO',
  id,
});

export const completeTodo = id => ({
  type: 'COMPLETE_TODO',
  id,
});

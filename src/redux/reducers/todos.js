const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: action.id,
          completed: false,
          ...action.item
        }
      ]
    case 'DELETE_TODO':
      return state.filter(({ id }) => id !== action.id)
    case 'EDIT_TODO':
      return state.map(
        todo =>
          todo.id === action.item.id
            ? action.item
            : todo
      )
    case 'COMPLETE_TODO':
      return state.map(
        todo =>
          todo.id === action.id
            ? { ...todo, completed: true }
            : todo
      )
    default:
      return state
  }
};

export default todos;

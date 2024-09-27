import { TodoItem } from './TodoItem';

export const TodoList = ({ todos, onEdit, onDelete }) => {
  return (
    <div>
      {todos.length === 0 ? (
        <p>No todos available.</p>
      ) : (
        todos.map(todo => (
          <TodoItem 
            key={todo.id} 
            todo={todo} 
            onEdit={onEdit} 
            onDelete={onDelete} 
          />
        ))
      )}
    </div>
  );
}

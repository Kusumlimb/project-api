const TodoItem = ({ todo, onDelete, onEdit }) => (
  <div className="todo-item">
    <h3>{todo.name}</h3>
    <p>{todo.work}</p>
    <p>{todo.due_date}</p>
    {todo.image && <img src={`https://project-api.test/storage/${todo.image}`} alt={todo.name} />}
    <button onClick={() => onEdit(todo)}>Edit</button>
    <button onClick={() => onDelete(todo.id)}>Delete</button>
  </div>
);

export default TodoItem;

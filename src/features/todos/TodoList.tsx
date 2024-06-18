import { useState } from "react";
import {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} from "../api/apiSlice";

const TodoList = () => {
  const [newTodo, setNewTodo] = useState<string>("");

  const {
    data: todos,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTodosQuery();

    const [addTodo, { isLoading: isAdding }] = useAddTodoMutation();
    const [updateTodo, { isLoading: isUpdating }] = useUpdateTodoMutation();
    const [deleteTodo, { isLoading: isDeleting }] = useDeleteTodoMutation();


  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    addTodo({userId: 1, title: newTodo, completed: false})
    setNewTodo("");
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return (
    <>
      <form
        onSubmit={submitHandler}
        className="flex flex-col gap-y-2 justify-center h-screen items-center"
      >
        <label htmlFor="new-todo">Enter a new todo item</label>
        <input
          type="text"
          id="new-todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter a new todo item"
        />
        <button type="submit">Add Todo</button>
      </form>

      <div className="flex flex-col gap-y-2 justify-center h-screen items-center">
        {isSuccess && (
          <ul>
            {todos?.map((todo) => (
              <li key={todo.id}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={(e) =>
                    updateTodo({
                      id: todo.id,
                      completed: e.target.checked,
                    })
                  }
                />
                <span>{todo.title}</span>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  disabled={isDeleting}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default TodoList;

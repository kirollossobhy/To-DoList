"use clint"
import { useRef, useState, useEffect } from "react";
import "./App.css";
import Footer from "./components/footer";

function App() {
  const [todos, setTodos] = useState([]);
  const titleRef = useRef();
  const descRef = useRef();

  const COOKIE_NAME = "todos";

  const saveTodosToCookie = (todosToSave) => {
    try {
      const value = encodeURIComponent(JSON.stringify(todosToSave));
      // save for 30 days
      document.cookie = `${COOKIE_NAME}=${value};path=/;max-age=${60 * 60 * 24 * 30}`;
    } catch (e) {
      // ignore cookie write errors
    }
  };

  const loadTodosFromCookie = () => {
    try {
      const match = document.cookie.split("; ").find((row) => row.startsWith(COOKIE_NAME + "="));
      if (!match) return [];
      const raw = match.split("=")[1] || "";
      return JSON.parse(decodeURIComponent(raw));
    } catch (e) {
      return [];
    }
  };

  const handleAddTodo = () => {
    const title = titleRef.current.value.trim();
    const description = descRef.current.value.trim();

    // require a title
    if (!title) {
      alert("Please enter something to add...");
      titleRef.current.focus();
      return;
    }

    const newTodo = { completed: false, title, description };
    setTodos([...todos, newTodo]);

    // clear inputs
    titleRef.current.value = "";
    descRef.current.value = "";
  };

  const handleItemDone = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const handleCompletedItem = (index) => {
  
    handleItemDone(index);
  };

  const handleDeleteItem = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  // load todos from cookie on mount
  useEffect(() => {
    const saved = loadTodosFromCookie();
    if (saved && Array.isArray(saved) && saved.length > 0) {
      setTodos(saved);
    }

  }, []);

  // save todos to cookie whenever user changes
  useEffect(() => {
    saveTodosToCookie(todos);
  }, [todos]);

  return (
    <>
      <div className="App-container">
        <h1>To-DoList</h1>
        <div className="App">
          <div className="todo-container">


            <div className="input-row">
              <input className="title"
                ref={titleRef}
                type="text"
                placeholder="Enter a todo title..."
                maxLength={50} required
              />

              <input className="desc"
                ref={descRef}
                type="text"
                placeholder="Enter a todo description..."
                maxLength={150}
              />

              <button onClick={handleAddTodo}>Add Todo</button>
                          <ul>
              {todos.map(({ title, description, completed }, index) => {
                return (
                  <div className="item" key={index}>
                    <div>
                      <li
                        className={completed ? "done" : ""}
                        onClick={() => handleItemDone(index)}
                      >
                        <strong>{title}</strong>
                        {description ? <div className="desc">{description}</div> : null}
                      </li>
                    </div>

                    <div>
                      <span
                        className={`completed ${completed ? "uncompleted" : ""}`}
                        onClick={() => handleCompletedItem(index)}
                      >
                        {completed ? "Uncompleted"  : "Completed"}
                      </span>

                      <span
                        className="delete"
                        onClick={() => handleDeleteItem(index)}
                      >
                        Delete
                      </span>
                    </div>
                  </div>
                );
              })}
            </ul>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;

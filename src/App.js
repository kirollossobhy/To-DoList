import { useRef, useState } from "react";
import "./App.css";
import Footer from "./components/footer";

function App() {
  const [todos, setTodos] = useState([]);
  const inputRef = useRef();
  const handleAddTodo = () => {
    const text = inputRef.current.value;
    const newTodos = { completed: false, text };
    setTodos([...todos, newTodos]);
    inputRef.current.value = "";
    console.log(text);
  };
  const handleItemDone = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };
  const handleCompletedItem = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };
  const handleDeleteItem = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };
  return (
    <fragment className="App-container">
      <h1>To-DoList</h1>
      <div className="App">
        
        <div className="todo-container">
          <ul>
            {todos.map(({ text, completed }, index) => {
              return (
                <div className="item">
                  <div>
                    <li
                      className={completed ? "done" : ""}
                      key={index}
                      onClick={() => handleItemDone(index)}
                    >
                      {text}
                    </li>

                  </div>

                  <div>
                    <span className="completed"
                      onClick={() => handleCompletedItem(index)}>Completed</span>

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
          <div className="input-row">
            <input
              ref={inputRef}
              type="text"
              placeholder="Enter a todo item..."
            ></input>
            <button onClick={handleAddTodo}>Add Todo</button>

          </div>


        </div>

      </div>
      <Footer />
    </fragment>
  );
}

export default App;

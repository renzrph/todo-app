import { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [addNewItem, setAddNewItem] = useState("");
  const [addTodo, setAddTodo] = useState([]);

  useEffect(() => {
    const storedTodoItems = localStorage.getItem("todoItems");
    if (storedTodoItems) {
      setAddTodo(JSON.parse(storedTodoItems));
    }
  }, []);

  // HELPER FUNCTIONS

  // input handler
  const inputHandler = (event) => {
    setAddNewItem(event.target.value);
  };

  // add todo items
  const addItem = () => {
    if (!addNewItem) return alert("Add an item!");

    const item = {
      id: Math.floor(Math.random() * 1000),
      value: addNewItem,
    };

    setAddTodo((prevList) => [...prevList, item]);
    setAddNewItem("");

    localStorage.setItem("todoItems", JSON.stringify(addTodo)); // Update local storage
  };

  // delete todo items
  const deleteItem = (id) => {
    const newArray = addTodo.filter((todoItems) => todoItems.id !== id);
    setAddTodo(newArray);

    localStorage.setItem("todoItems", JSON.stringify(newArray)); // Update local storage
  };

  // edit todo items
  const editItem = (id, editedValue) => {
    const updatedTodoList = addTodo.map((item) => {
      if (item.id === id) {
        return { ...item, value: editedValue };
      }
      return item;
    });
    setAddTodo(updatedTodoList);

    localStorage.setItem("todoItems", JSON.stringify(updatedTodoList)); // Update local storage
  };

  return (
    <>
      <div className="container">
        <h1>Todo List App</h1>
        <div className="input-container">
          <input
            type="text"
            placeholder="Add items.."
            value={addNewItem}
            onChange={inputHandler}
          />
          <button className="add-button" onClick={addItem}>
            Add
          </button>
        </div>
        <ul>
          {addTodo.map((todoItems) => (
            <li className="items" key={todoItems.id}>
              {todoItems.value}

              <div className="options">
                <button
                  className="edit"
                  onClick={() => {
                    const editedValue = prompt(
                      "Edit the item:",
                      todoItems.value
                    );
                    if (editedValue !== null) {
                      editItem(todoItems.id, editedValue);
                    }
                  }}
                >
                  EDIT
                </button>

                <button
                  className="delete"
                  onClick={() => deleteItem(todoItems.id)}
                >
                  DELETE
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default App;

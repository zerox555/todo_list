import { useState, useCallback, useMemo, useEffect, memo } from "react";


const TodoTypes = ["education", "recreational", "social", "diy", "charity", "cooking", "relaxation", "music", "busywork"];

/* component to allow user create todo items
   only rerender if props change */
const TodoForm = memo(({ formData, handleChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} style={{
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      width: "100%",
      maxWidth: "1000px",
      margin: "auto"
    }}>
      <input
        type="text"
        name="activity"
        placeholder="Activity"
        value={formData.activity}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        required
      />

      <select
        name="type"
        value={formData.type}
        onChange={handleChange}
      >
        {TodoTypes.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>

      <label style={{ display: "flex", alignItems: "center", gap: "5px" }}>
        <input
          type="checkbox"
          name="bookingRequired"
          checked={formData.bookingRequired}
          onChange={handleChange}
        />
        Booking Required
      </label>

      <label style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        Accessibility: {formData.accessibility}
        <input
          type="range"
          name="accessibility"
          min="0"
          max="1"
          step="0.1"
          value={formData.accessibility}
          onChange={handleChange}
        />
      </label>

      <button type="submit">Add To-Do</button>
    </form>
  );
});

/* todo item entries
 only rerender if props change */
const TodoList = memo(({ todos, handleDelete }) => {
  return (
    <ul style={{ paddingTop: "10px", listStyle: "none" }}>
      {todos.map((todo, index) => (
        <li key={index} style={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          marginBottom: "10px",
          width:"200px"
        }}>
          <span><strong>Activity:</strong> {todo.activity}</span>
          <span><strong>Price:</strong> ${todo.price}</span>
          <span><strong>Type:</strong> {todo.type}</span>
          <span><strong>Booking Required:</strong> {todo.bookingRequired ? "Yes" : "No"}</span>
          <span><strong>Accessibility:</strong> {todo.accessibility}</span>
          <button onClick={() => handleDelete(index)}>Delete</button>
        </li>
      ))}
    </ul>
  );
});


export default function TodoLandingPage() {
  // stores todo items in localStorage for storage
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  // set initial data
  const [formData, setFormData] = useState({
    activity: "",
    price: "",
    type: "education",
    bookingRequired: false,
    accessibility: 0.5,
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // handles the form data based on user input
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // adds new todo item based on user input stored in useState
  const handleSubmit = (e) => {
    e.preventDefault();
    setTodos((prevTodos) => [...prevTodos, formData]);
    setFormData({ activity: "", price: "", type: "education", bookingRequired: false, accessibility: 0.5 });
  };

  const handleDelete = (index) => {
    setTodos((prevTodos) => prevTodos.filter((_, i) => i !== index));
  };

  const totalItems = todos.length;

  return (
    <div style={{ padding: "20px" }}>
      <h1>To-Do List</h1>
      <p><strong>Total Items: {totalItems}</strong></p>
      
      <TodoForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />
 
      <TodoList todos={todos} handleDelete={handleDelete} />
    </div>
  );
}

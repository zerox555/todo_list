import { useState, useEffect } from "react";

export default function TodoLandingPage() {
  const [todos, setTodos] = useState(() => {
    // Load from localStorage on mount
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [formData, setFormData] = useState({
    activity: "",
    price: "",
    type: "education",
    bookingRequired: false,
    accessibility: 0.5,
  });

  useEffect(() => {
    // Save todos to localStorage whenever they change
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTodos([...todos, formData]);
    setFormData({ activity: "", price: "", type: "education", bookingRequired: false, accessibility: 0.5 });
  };

  const handleDelete = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>To-Do List</h1>
      <p><strong>Total Items: {todos.length}</strong></p>
      
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
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
          {["education", "recreational", "social", "diy", "charity", "cooking", "relaxation", "music", "busywork"].map((option) => (
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
      
      <ul style={{ paddingTop: "10px" }}>
        {todos.map((todo, index) => (
          <li key={index} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span>
              <strong>{todo.activity}</strong> - ${todo.price} - {todo.type} - {todo.bookingRequired ? "Booking Required" : "No Booking"} - Accessibility: {todo.accessibility}
            </span>
            <button onClick={() => handleDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

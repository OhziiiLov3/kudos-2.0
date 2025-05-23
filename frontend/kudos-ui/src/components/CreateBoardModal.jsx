import { useState } from "react";
import "../styles/Modal.css";

const CreateBoardModal = ({ onClose, onCreate }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "celebration",
    stickerUrl: "",
  });

  const user = JSON.parse(localStorage.getItem("user"));

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) return alert("You must be logged in to create a board");
    onCreate({ ...form, authorId: user.userId });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Create New Board</h2>
        <form onSubmit={handleSubmit}>
          <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
          <input name="description" placeholder="Description" value={form.description} onChange={handleChange} />
          <select name="category" value={form.category} onChange={handleChange}>
            <option value="celebration">Celebration</option>
            <option value="thank you">Thank You</option>
            <option value="inspiration">Inspiration</option>
          </select>
          <input name="stickerUrl" placeholder="Image URL" value={form.stickerUrl} onChange={handleChange} />
          <div className="modal-actions">
            <button type="submit">Create</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBoardModal;

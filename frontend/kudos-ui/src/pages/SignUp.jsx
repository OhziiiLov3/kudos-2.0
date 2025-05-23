import { useState } from "react";
import { signup } from "../services/authService";
import "../styles/Signup.css";

const SignUp = () => {
  const [form, setForm] = useState({ email: "", username: "", password: "" });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await signup(form);
      localStorage.setItem("user", JSON.stringify(user));
      setMessage("Signup successful! Redirecting...");
      setMessageType("success");

      setTimeout(() => {
        window.location.href = "/";
      }, 1500);

      
    } catch (err) {
       const errorMessage =
      err.response?.data?.message || "Signup failed. Try again.";
     setMessage(errorMessage);
     setMessageType("error");
    }
  };

  return (
    <div className="auth-container">
      <h2>Signup</h2>
      {message && (
        <div className={`popup-message ${messageType}`}>{message}</div>
      )}

      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          name="username"
          onChange={handleChange}
          placeholder="Username"
          required
        />
        <input
          name="password"
          type="password"
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default SignUp;

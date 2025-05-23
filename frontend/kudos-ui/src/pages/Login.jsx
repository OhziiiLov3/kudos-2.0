
import { useState } from 'react';
import { login } from '../services/authService';
import '../styles/Login.css';

const Login = () => {
    const [form, setForm] = useState({ username: '', password: '' });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(form);
      localStorage.setItem('user', JSON.stringify(user));
      window.location.href = '/'; // Redirect to homepage
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" type="email" onChange={handleChange} placeholder="Email" required />
        <input name="password" type="password" onChange={handleChange} placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
 
export default Login;
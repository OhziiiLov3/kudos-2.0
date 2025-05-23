import axios from 'axios';

const API_URL = 'http://localhost:3000/api/auth';


export const signup = async (userData) => {
  const res = await axios.post(`${API_URL}/signup`, userData);
  if (res.data.token) {
    localStorage.setItem(
      'user',
      JSON.stringify({ token: res.data.token, userId: res.data.userId })
    );
  }
  return res.data;
};

export const login = async (userData) => {
  const res = await axios.post(`${API_URL}/login`, userData);
  if (res.data.token) {
    localStorage.setItem(
      'user',
      JSON.stringify({ token: res.data.token, userId: res.data.userId,  username: res.data.username })
    );
  }
  return res.data;
};


export const logout = () => {
  localStorage.removeItem('user');
};


export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

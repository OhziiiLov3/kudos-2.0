import axios from 'axios';

const API_URL = 'http://localhost:3000/api/boards';

export const getAllBoards = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const getBoardById = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

export const createBoard = async (boardData) => {
  const res = await axios.post(API_URL, boardData);
  return res.data;
};

export const updateBoard = async (id, updatedData) => {
  const res = await axios.put(`${API_URL}/${id}`, updatedData);
  return res.data;
};

export const deleteBoard = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};



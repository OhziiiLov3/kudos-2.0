import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/cards';

export const getCardsByBoardId = async (boardId) => {
  const response = await axios.get(`${API_URL}/board/${boardId}`);
  return response.data;
};

export const getCardById = async (cardId) => {
  const response = await axios.get(`${API_URL}/${cardId}`);
  return response.data;
};

export const createCard = async (cardData) => {
  const response = await axios.post(`${API_URL}`, cardData);
  return response.data;
};

export const updateCard = async (cardId, cardData) => {
  const response = await axios.put(`${API_URL}/${cardId}`, cardData);
  return response.data;
};

export const deleteCard = async (cardId) => {
  const response = await axios.delete(`${API_URL}/${cardId}`);
  return response.data;
}
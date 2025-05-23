
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createCard = async (req, res) => {
  try {
    const { title, message, gifUrl, board_id, authorId } = req.body;

    if (!title) return res.status(400).json({ error: 'Title is required' });
    if (!board_id) return res.status(400).json({ error: 'boardId is required' });

    const board = await prisma.board.findUnique({ where: { board_id: board_id } });
    if (!board) return res.status(404).json({ error: 'Board not found' });

    const newCard = await prisma.card.create({
      data: { title, message, gifUrl, board_id, authorId },
    });

    res.status(201).json(newCard);
  } catch (error) {
    console.error('Create Card error:', error);
    res.status(500).json({ error: 'Failed to create card' });
  }
};

// READ all cards for a board
const getCardsByBoardId = async (req, res) => {
  try {
    const board_id = parseInt(req.params.board_id);
    if (isNaN(board_id)) return res.status(400).json({ error: 'Invalid board_id' });

    const cards = await prisma.card.findMany({ where: { board_id } });

    res.status(200).json(cards);
  } catch (error) {
    console.error('Get Cards error:', error);
    res.status(500).json({ error: 'Failed to fetch cards' });
  }
};

// READ a single card by card_id
const getCardById = async (req, res) => {
  try {
    const card_id = parseInt(req.params.card_id);
    if (isNaN(card_id)) return res.status(400).json({ error: 'Invalid card_id' });

    const card = await prisma.card.findUnique({ where: { card_id } });
    if (!card) return res.status(404).json({ error: 'Card not found' });

    res.status(200).json(card);
  } catch (error) {
    console.error('Get Card error:', error);
    res.status(500).json({ error: 'Failed to fetch card' });
  }
};

// UPDATE a card
const updateCard = async (req, res) => {
  try {
    const card_id = parseInt(req.params.card_id);
    if (isNaN(card_id)) return res.status(400).json({ error: 'Invalid card_id' });

    const { title, message, gifUrl } = req.body;

    const updatedCard = await prisma.card.update({
      where: { card_id },
      data: { title, message, gifUrl },
    });

    res.status(200).json(updatedCard);
  } catch (error) {
    console.error('Update Card error:', error);
    res.status(500).json({ error: 'Failed to update card' });
  }
};

// DELETE a card
const deleteCard = async (req, res) => {
  try {
    const card_id = parseInt(req.params.card_id);
    if (isNaN(card_id)) return res.status(400).json({ error: 'Invalid card_id' });

    await prisma.card.delete({ where: { card_id } });

    res.status(200).json({ message: 'Card deleted successfully' });
  } catch (error) {
    console.error('Delete Card error:', error);
    res.status(500).json({ error: 'Failed to delete card' });
  }
};

module.exports = {
  createCard,
  getCardsByBoardId,
  getCardById,
  updateCard,
  deleteCard,
};
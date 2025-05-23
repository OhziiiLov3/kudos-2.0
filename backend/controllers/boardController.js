const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();





// CREATE
const createBoard = async (req, res) => {
  try {
    const { title, category, authorId, stickerUrl } = req.body;
    console.log(req.body)

    if (!title) return res.status(400).json({ error: 'Title is required' });

    const newBoard = await prisma.board.create({
      data: {
        title,
        category,
        authorId,
        stickerUrl,
      },
    });

    res.status(201).json(newBoard);
  } catch (error) {
    console.error('Create error:', error);
    res.status(500).json({ error: 'Failed to create board' });
  }
};


const getAllBoards = async (req, res) => {
  try {
    const boards = await prisma.board.findMany({
      include: { author: true },
    });
    res.status(200).json(boards);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch boards' });
  }
};


const getBoardById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: 'Invalid board ID' });

    const board = await prisma.board.findUnique({ where: { board_id: id } });

    if (!board) return res.status(404).json({ error: 'Board not found' });

    res.json(board);
  } catch (error) {
    console.error('Get Board error:', error);
    res.status(500).json({ error: 'Failed to fetch board' });
  }
};


const updateBoard = async (req, res) => {
  const { id } = req.params;
  const { title, category, stickerUrl } = req.body;

  try {
    const updatedBoard = await prisma.board.update({
      where: { board_id: parseInt(id) },
      data: { title, category, stickerUrl },
    });

    res.status(200).json(updatedBoard);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update board' });
  }
};

const deleteBoard = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.board.delete({
      where: { board_id: parseInt(id) },
    });

    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete board' });
  }
};

module.exports = {
  createBoard,
  getAllBoards,
  getBoardById,
  updateBoard,
  deleteBoard,
};
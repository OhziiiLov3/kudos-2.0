const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();





// CREATE
const createBoard = async (req, res) => {
  try {
    const { title, category, authorId, stickerUrl } = req.body;
    console.log(req.body)
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


module.exports = {
    createBoard,
}
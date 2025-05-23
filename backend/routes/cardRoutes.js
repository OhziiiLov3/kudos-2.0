const express = require('express');
const router = express.Router();
const {
  createCard,
  getCardsByBoardId,
  getCardById,
  updateCard,
  deleteCard
} = require('../controllers/cardController');

router.post('/', createCard);
router.get('/board/:board_id', getCardsByBoardId);
router.get('/:card_id', getCardById);
router.put('/:card_id', updateCard);
router.delete('/:card_id', deleteCard);

module.exports = router;

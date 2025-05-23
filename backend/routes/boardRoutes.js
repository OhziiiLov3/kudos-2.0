const express = require('express');
const {
    createBoard,
} =  require('../controllers/boardController.js');

const router = express.Router();




router.post('/', createBoard);



module.exports = router;
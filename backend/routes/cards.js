const express = require('express');

const cardRouter = express.Router();

const { errors } = require('celebrate');

const {
  getCards, deleteCard, createCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const {
  validateCardCreate, validateCardId,
} = require('../middlewares/validation');

cardRouter.get('/', getCards);

cardRouter.delete('/:cardId', validateCardId, deleteCard);

cardRouter.post('/', validateCardCreate, createCard);

cardRouter.put('/:cardId/likes', validateCardId, likeCard);

cardRouter.delete('/:cardId/likes', validateCardId, dislikeCard);

cardRouter.use(errors());

module.exports = cardRouter;

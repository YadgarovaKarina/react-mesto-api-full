import { Router } from 'express';

import {
  getCards,
  createCard,
  deleteCard,
  putLike,
  deleteLike,
} from '../controllers/cards.js';

import {
  cardIdValidator,
  cardBodyValidator,
} from '../validators/cardsValidator.js';

export const router = Router();

router.get('/', cardBodyValidator, getCards);
router.post('/', cardBodyValidator, createCard);
router.delete('/:cardId', cardIdValidator, deleteCard);
router.put('/:cardId/likes', cardIdValidator, putLike);
router.delete('/:cardId/likes', cardIdValidator, deleteLike);

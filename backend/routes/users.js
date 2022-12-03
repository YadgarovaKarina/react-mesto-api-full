import { Router } from 'express';

import {
  getUsers,
  getUserById,
  updateUserProfile,
  updateUserAvatar,
  readOne,
} from '../controllers/users.js';

import {
  userIdValidator,
  userProfileValidator,
  userAvatarValidator,
} from '../validators/userValidator.js';

export const router = Router();

router.get('/', getUsers);
router.get('/me', readOne);
router.get('/:userId', userIdValidator, getUserById);
router.patch('/me', userProfileValidator, updateUserProfile);
router.patch('/me/avatar', userAvatarValidator, updateUserAvatar);

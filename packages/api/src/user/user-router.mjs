import Express from 'express';
import * as UserController from './user-controller.mjs';

const router = Express.Router();
router.get('/', UserController.getUsers);

export default router;

import Express from 'express';
import * as AuthController from './auth-controller.mjs';
import * as AuthMiddleware from './auth-middleware.mjs';

const router = Express.Router();

router.post('/login', AuthMiddleware.authenticateLocal, AuthController.loginLocal);

export default router;

import express from 'express';
import passport from 'passport';
import { configurePassport } from './config/passport.mjs';
import userRouter from './user/user-router.mjs';
import authRouter from './auth/auth-router.mjs';

const BASE_URL_V1 = '/api/v1';
const app = express();

app.use(express.json({}));
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
configurePassport(passport);

app.get('/', (_, res) => {
    res.json({ message: 'Express API root, visit /api/v1/{resource} for more' });
});

app.get(BASE_URL_V1, (_, res) => {
    res.json({ message: 'Express API', version: 1 });
});

app.use(`${BASE_URL_V1}/users`, userRouter);
app.use(`${BASE_URL_V1}/auth`, authRouter);

export { app };

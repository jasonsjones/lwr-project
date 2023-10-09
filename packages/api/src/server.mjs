import express from 'express';
import userRouter from './user/user-router.mjs';

const BASE_URL_V1 = '/api/v1';
const app = express();

app.get('/', (_, res) => {
    res.json({ message: 'Express API root, visit /api/v1/{resource} for more' });
});

app.get(BASE_URL_V1, (_, res) => {
    res.json({ message: 'Express API', version: 1 });
});

app.use(`${BASE_URL_V1}/users`, userRouter);

export { app };

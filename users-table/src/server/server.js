import express from 'express';
import cors from 'cors';
import { router as usersRouter } from './routes/users.js';

const PORT = 3000;

const app = express();

app.use(cors());

app.use(usersRouter);

app.listen(process.env.PORT || PORT, () => {
  console.log(`API is ready on http://localhost:${PORT}`);
})

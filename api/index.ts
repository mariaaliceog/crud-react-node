require('dotenv').config();
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { router } from './routes/users';

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", router); // rota principal

app.listen(8800, () => {
  console.log('Server is running on port 8800');
});

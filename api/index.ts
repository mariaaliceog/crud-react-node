require('dotenv').config();
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import userRoutes from './routes/users';

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use("/", userRoutes); // rota principal

app.listen(8800, () => {
  console.log('Server is running on port 8800');
});

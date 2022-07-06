import express from 'express';
import 'dotenv/config';
import log from './logger';
import { config } from './config/default';
import connectToDb from './db/conn';
import authRouter from './Routes/auth.routes';
import axios from 'axios';

const app = express();

// app.use(express.json());

// app.use(authRouter);

app.get('/', async (req, res) => {
  const albumId = req.query.albumId;
  const { data } = await axios.get('https://jsonplaceholder.typicode.com/photos', { params: { albumId } });

  res.json(data);
});

app.listen(config.port, () => {
  log.info(`Server is listening at ${config.port}`);
  connectToDb();
});

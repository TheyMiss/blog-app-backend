import express from 'express';
import http from 'http';
import 'dotenv/config';
import log from './logger';
import { config } from './config/default';
import connectToDb from './db/conn';

const app = express();

const server = http.createServer(app);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

server.listen(() => {
  log.info(`Server is listening at ${config.port}`);
  connectToDb();
});

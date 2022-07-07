import express from 'express';
import 'dotenv/config';
import log from './logger';
import config from 'config';
import connectToDb from './db/conn';
import authRouter from './Routes/auth.routes';
import deserializeUser from './middleware/deserializeUser';

const app = express();

const port = config.get('port');

app.use(express.json());

app.use(deserializeUser);

app.use(authRouter);

app.listen(port, () => {
  log.info(`Server is listening at ${port}`);
  connectToDb();
});

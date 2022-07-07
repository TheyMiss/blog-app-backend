import { Request, Response } from 'express';
import { CreateSessionInput } from '../schema/auth.schema';
import { findSessionById, signAccesToken, signRefreshToken } from '../services/auth.service';
import { findUserByEmail, findUserByid } from '../services/user.services';
import { verifyJwt } from '../utils/jwt';
import { get } from 'lodash';

export const createSessionHandler = async (req: Request<CreateSessionInput>, res: Response) => {
  const message = 'Invalid email or password!';
  const { email, password } = req.body;

  const user = await findUserByEmail(email);

  if (!user) {
    return res.send(message);
  }

  const isValid = await user.validatePassword(password);

  if (!isValid) {
    return res.send(message);
  }

  const accessToken = signAccesToken(user);

  const refreshToken = await signRefreshToken({ userId: user._id });

  return res.send({ accessToken, refreshToken: refreshToken });
};

export const refreshAccesTokenHandler = async (req: Request, res: Response) => {
  const refreshToken = get(req, 'headers.x-refresh');

  const decoded = verifyJwt<{ session: string }>(refreshToken, 'refreshTokenPublicKey');

  if (!decoded) {
    res.status(401).send('Could not refresh access token! 1');
  }

  const session = await findSessionById(decoded.session);

  if (!session || !session.valid) {
    res.status(401).send('Could not refresh access token! 2');
  }

  const user = await findUserByid(String(session.user));

  if (!user) {
    res.status(401).send('Could not refresh access token! 3');
  }

  const accessToken = signAccesToken(user);

  res.send({ accessToken: accessToken });
};

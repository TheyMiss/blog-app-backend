import { Request, Response } from 'express';
import { CreateSessionInput } from '../schema/auth.schema';
import { signAccesToken, signRefreshToken } from '../services/auth.service';
import { findUserByEmail } from '../services/user.services';

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

  const refresToken = await signRefreshToken({ userId: user._id });

  return res.send({ accessToken, refresToken });
};

import { DocumentType } from '@typegoose/typegoose';
import SessionModel from '../models/session.model';
import { User } from '../models/user.model';
import { signJwt } from '../utils/jwt';

export const createSession = async ({ userId }: { userId: string }) => {
  return SessionModel.create({ user: userId });
};

export const signRefreshToken = async ({ userId }: { userId: string }) => {
  const session = await createSession({ userId });

  const refreshToken = signJwt(
    {
      session: session._id,
    },
    'refreshTokenPrivateKey',
    { expiresIn: '1y' },
  );

  return refreshToken;
};

export const findSessionById = (id: string) => {
  return SessionModel.findById(id);
};

export const signAccesToken = (user: DocumentType<User>) => {
  const payload = user.toJSON();

  const accessToken = signJwt(payload, 'accessTokenPrivateKey', { expiresIn: '15min' });

  return accessToken;
};

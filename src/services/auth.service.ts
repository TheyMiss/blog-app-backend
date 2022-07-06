import { DocumentType } from '@typegoose/typegoose';
import SessionModel from '../models/session.model';
import { User } from '../models/user.model';
import { signJwt } from '../utils/jwt';

export const createSession = async ({ userId }: { userId: string }) => {
  return SessionModel.create({ user: userId });
};

export const signRefreshToken = async ({ userId }: { userId: string }) => {
  const session = await createSession({ userId });

  const refresToken = signJwt(
    {
      session: session._id,
    },
    'refreshTokenPrivateKey',
  );

  return refresToken;
};

export const signAccesToken = (user: DocumentType<User>) => {
  const payload = user.toJSON();

  const accessToken = signJwt(payload, 'accessTokenPrivateKey');

  return accessToken;
};

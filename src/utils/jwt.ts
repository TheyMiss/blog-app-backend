import jwt from 'jsonwebtoken';
import { config } from '../config/default';

export function signJwt(
  object: object,
  keyname: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey',
  options?: jwt.SignOptions | undefined,
) {
  const signInKey = Buffer.from(config[keyname], 'base64').toString('ascii');

  return jwt.sign(object, signInKey, {
    ...(options && options),
    algorithm: 'RS256',
  });
}

export function verifyJwt<T>(token: string, keyname: 'accessTokenPublicKey' | 'refreshTokenPublicKey'): T | null {
  const publicKey = Buffer.from(config[keyname], 'base64').toString('ascii');

  try {
    const decoded = jwt.verify(token, publicKey) as T;
    return decoded;
  } catch (error) {
    return null;
  }
}

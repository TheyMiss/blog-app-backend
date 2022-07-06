import 'dotenv/config';

export default {
  port: process.env.PORT,
  mongodb_uri: process.env.MONGODB_URI,
  email: process.env.EMAIL,
  password: process.env.PASSWORD,
  passwordConfirmation: process.env.PASSWORDCONFIRMATION,
  accessTokenPrivateKey: process.env.ACCESS_TOKEN_PRIVATE_KEY,
  refreshTokenPrivateKey: process.env.REFRESH_TOKEN_PRIVATE_KEY,
};

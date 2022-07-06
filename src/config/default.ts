import 'dotenv/config';

export const config = {
  port: process.env.PORT,
  mongodb_uri: process.env.MONGODB_URI,
  email: process.env.EMAIL,
  password: process.env.PASSWORD,
  passwordConfirmation: process.env.PASSWORDCONFIRMATION,
};

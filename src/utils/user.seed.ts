import config from 'config';
import connectToDb from '../db/conn';
import disconnectFromDb from '../db/disConn';
import log from '../logger';
import UserModel from '../models/user.model';
import { createUserSchema } from '../schema/user.schema';
import { findUserByEmail } from '../services/user.services';

const CreateUserHandler = async () => {
  connectToDb();
  try {
    const body = {
      email: config.get('email'),
      password: config.get('password'),
      passwordConfirmation: config.get('passwordConfirmation'),
    };

    const data = createUserSchema.parse(body);

    const doesUserExist = await findUserByEmail(data.email);

    if (!doesUserExist) {
      await UserModel.create(data);
    } else {
      console.log('User already exist!');
    }
  } catch (error) {
    log.error(error, 'Creating user failed!');
  }

  disconnectFromDb();
};

CreateUserHandler();

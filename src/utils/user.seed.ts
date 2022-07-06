import { config } from '../config/default';
import connectToDb from '../db/conn';
import disconnectFromDb from '../db/disConn';
import log from '../logger';
import UserModel from '../models/user.model';
import { createUserSchema } from '../schema/user.schema';

const CreateUserHandler = async () => {
  connectToDb();
  try {
    const body = {
      email: config.email,
      password: config.password,
      passwordConfirmation: config.passwordConfirmation,
    };

    const data = createUserSchema.parse(body);

    const doesUserExist = await UserModel.findOne({ email: data.email });

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

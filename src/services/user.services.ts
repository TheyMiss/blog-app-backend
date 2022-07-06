import UserModel from '../models/user.model';

export const findUserByEmail = async (email: string) => {
  return UserModel.findOne({ email: email });
};

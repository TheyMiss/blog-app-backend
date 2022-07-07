import UserModel from '../models/user.model';

export const findUserByid = async (id: string) => {
  return UserModel.findById(id);
};

export const findUserByEmail = async (email: string) => {
  return UserModel.findOne({ email: email });
};

import { DocumentType, getModelForClass, pre, prop } from '@typegoose/typegoose';
import argon2 from 'argon2';
import log from '../logger';

@pre<User>('save', async function () {
  if (!this.isModified('password')) {
    return;
  }

  const hash = await argon2.hash(this.password);

  this.password = hash;

  return;
})
export class User {
  @prop({ required: true, unique: true, lowercase: true })
  email: number;

  @prop({ required: true })
  password: string;

  async validatePassword(this: DocumentType<User>, candidatePassword: string) {
    try {
      return await argon2.verify(this.password, candidatePassword);
    } catch (error) {
      log.error(error, 'Could not validate');
      return false;
    }
  }
}

const UserModel = getModelForClass(User);

export default UserModel;

import { Model, type IMongoloquentSchema, type IMongoloquentTimestamps } from "mongoloquent";
import { comparePasswords, generateToken, hashPassword, verifyToken } from "../lib/auth";
import type { ObjectId } from "mongodb";

interface IUsers extends IMongoloquentSchema, IMongoloquentTimestamps {
  username: string
  password: string
  email: string
  role?: string
}

interface IToken {
  id: ObjectId
  username: string
}

export class Users extends Model<IUsers> {
  /**
   * The attributes of the model.
   *
   * @var IUsers
   */
  public static $schema: IUsers

  static async login (username: string, password: string): Promise<string> {
    try {
      const user = await Users.where('username', username).first();
      if (!user) {
       throw new Error('Invalid username or password');
      }
      const validPassword = comparePasswords(password, user.password);
      if (!validPassword) {
        throw new Error('Invalid username or password');
      }
      const payload: IToken = { id: user._id as ObjectId, username: user.username }
      return generateToken(payload);

    } catch (error:unknown) {
      console.error('Login error:', error);
      return error as string;
    }
  }

  static async register (username: string, password: string, email: string): Promise<IUsers> {
    try {
      const existingUser = await Users.where('username', username).first();
      if (existingUser) {
        throw new Error('Username already exists');
      }
      const existingEmail = await Users.where('email', email).first();
      if (existingEmail) {
        throw new Error('Email already exists');
      }
      const hashedPassword = hashPassword(password);
      const user = await Users.create({ username, password: hashedPassword, email });
      return user;
    } catch (error:unknown) {
      console.error('Registration error:', error);
      throw error;
    }
  }
}
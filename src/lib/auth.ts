import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import type { ObjectId } from "mongodb";

interface IToken {
  id: ObjectId
  username: string
}
const JWT_SECRET = import.meta.env.JWT_SECRET;

export const generateToken = (payload: IToken): string => {
  return jwt.sign(payload, JWT_SECRET as string, { expiresIn: '1h' });
};

export const verifyToken = (token: string): IToken => {
  return jwt.verify(token, JWT_SECRET as string) as IToken;
}

export const hashPassword = (password: string): string => {
  return bcryptjs.hashSync(password, 10);
};

export const comparePasswords = (password: string, hashed: string): boolean => {
  return bcryptjs.compareSync(password, hashed);
};
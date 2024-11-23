import * as dotenv from 'dotenv';
dotenv.config();

import * as bcrypt from 'bcrypt';

export function hashPassword(password: string): string {
  const saltRounds = parseInt(process.env.SALT_ROUND);
  const hashedPassword = bcrypt.hashSync(password, saltRounds);
  return hashedPassword;
}

export function comparePassword(
  plainPassword: string,
  dbPassword: string,
): boolean {
  const isMatch = bcrypt.compareSync(plainPassword, dbPassword);
  return isMatch;
}

import * as bcrypt from 'bcrypt';

const saltRounds = 10;

export class Bcrypt {
  static async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, saltRounds);
  }

  static async compare(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}

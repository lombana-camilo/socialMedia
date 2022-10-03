import { EntityManager } from "@mikro-orm/postgresql";
import { SignUpInput, User } from "./../entities/User";
import bcrypt from "bcrypt";

export class UserService {
  async signUp(em: EntityManager, input: SignUpInput) {
    const newUser = em.create(User, input);
    //Hashing password
    const hash = await bcrypt.hash(newUser.password, 10);
    newUser.password = hash;
    await em.persistAndFlush(newUser);
      return newUser
  }
}

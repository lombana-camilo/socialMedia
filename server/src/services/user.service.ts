import { EntityManager } from "@mikro-orm/postgresql";
import { LoginInput, SignUpInput, User } from "./../entities/User";
import bcrypt from "bcrypt";
import { signJWT } from "./../utils/jwt.utils";
import { ApolloError } from "apollo-server";
import { Ctx } from "type-graphql";
import { Context } from "./../types/context";

export class UserService {
  async signUp(em: EntityManager, input: SignUpInput) {
    try {
      const newUser = em.create(User, input);
      //Hashing password
      const hash = await bcrypt.hash(newUser.password, 10);
      newUser.password = hash;
      await em.persistAndFlush(newUser);
      return newUser;
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  async login(@Ctx() ctx: Context, { email, password }: LoginInput) {
    try {
      const loginError = "Incorrect email or password";
      const user = await ctx.em.findOne(User, { email });
      if (!user) {
        throw new ApolloError(loginError);
      }

      // Verify password
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        throw new ApolloError(loginError);
      }
      console.log({ user });
      console.log({ isValid });

      // Issue JWT
      const token = signJWT({ name: user.name });
      console.log({ token });

      // Create cookie for JWT

      // Return token
      return token;
    } catch (e) {
      console.error(e);
      return null;
    }
  }
}

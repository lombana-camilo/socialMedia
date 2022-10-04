import { LoginInput, SignUpInput, User } from "./../entities/User";
import { UserService } from "./../services/user.service";
import { Context } from "./../types/context";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {
    this.userService = new UserService();
  }

  @Mutation(() => User)
  signUp(@Arg("input") input: SignUpInput, @Ctx() { em }: Context) {
    return this.userService.signUp(em, input);
  }

  @Mutation(() => String, { nullable: true })
  login(@Arg("input") input: LoginInput, @Ctx() ctx: Context) {
    return this.userService.login(ctx, input);
  }
}

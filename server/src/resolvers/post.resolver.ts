import { Post } from "./../entities/Post";
import { Ctx, Query, Resolver } from "type-graphql";
import { Context } from "./../types/context";
import { PostService } from "./../services/post.service";

@Resolver()
export class PostResolver {
  constructor(private postService: PostService) {
    this.postService = new PostService();
  }

  @Query(() => [Post])
  posts(@Ctx() {em}: Context) {
    return this.postService.posts(em)
  }
}

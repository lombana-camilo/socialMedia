import {
  CreatePostInput,
  DeletePostInput,
  Post,
  PostInput,
  UpdatePostInput,
} from "./../entities/Post";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Context } from "./../types/context";
import { PostService } from "./../services/post.service";

@Resolver()
export class PostResolver {
  constructor(private postService: PostService) {
    this.postService = new PostService();
  }

  @Query(() => [Post])
  posts(@Ctx() { em }: Context) {
    return this.postService.posts(em);
  }

  @Query(() => Post, { nullable: true })
  post(@Ctx() { em }: Context, @Arg("id") input: PostInput) {
    return this.postService.post(em, input);
  }

  @Mutation(() => Post)
  createPost(@Ctx() { em }: Context, @Arg("input") input: CreatePostInput) {
    return this.postService.createPost(em, input);
  }

  @Mutation(() => Post, { nullable: true })
  updatePost(@Ctx() { em }: Context, @Arg("input") input: UpdatePostInput) {
    return this.postService.updatePost(em, input);
  }

  @Mutation(() => Boolean, {nullable:true})
  deletePost(@Ctx() { em }: Context, @Arg("input") input: DeletePostInput) {
    return this.postService.deletePost(em, input);
  }
}

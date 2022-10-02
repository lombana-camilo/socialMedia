import { EntityManager } from "@mikro-orm/postgresql";
import {
  CreatePostInput,
  DeletePostInput,
  Post,
  PostInput,
  UpdatePostInput,
} from "./../entities/Post";

export class PostService {
  async posts(em: EntityManager) {
    return em.find(Post, {});
  }

  async post(em: EntityManager, input: PostInput) {
    return em.findOne(Post, { id: input.id });
  }

  async createPost(em: EntityManager, input: CreatePostInput) {
    const newPost = em.create(Post, input);
    await em.persistAndFlush(newPost);
    return newPost;
  }

  async updatePost(em: EntityManager, input: UpdatePostInput) {
    const post = await em.findOne(Post, { id: input.id });
    if (!post) {
      return null;
    }
    if (input.title) {
      post.title = input.title;
    }
    if (input.message) {
      post.message = input.message;
    }
    await em.persistAndFlush(post);
    return post;
  }

  async deletePost(em: EntityManager, input: DeletePostInput) {
    try {
    const post = await em.findOne(Post, { id: input.id });
    if (!post) {
      return null;
    }
      const deletedpost = await em.nativeDelete(Post, { id: input.id });
         console.log({deletedpost})
      return true;
    } catch (e) {
      return false;
    }
  }
}

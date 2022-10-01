import { EntityManager } from "@mikro-orm/postgresql";
import { Post } from "./../entities/Post";

export class PostService{
   async posts(em:EntityManager){
      return em.find(Post,{})
   }
}

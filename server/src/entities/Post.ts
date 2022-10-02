import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, InputType, Int, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Post {
  @Field(() => Int)
  @PrimaryKey()
  id!: number;

  @Field(() => String)
  @Property({ type: "date" })
  createdAt? = new Date();

  @Field(() => String)
  @Property({ type: "date ", onUpdate: () => new Date() })
  updatedAt? = new Date();

  @Field(() => String)
  @Property({ type: "text" })
  title!: string;

  @Field(() => String)
  @Property({ type: "text" })
  message!: string;
}

@InputType()
export class PostInput {
  @Field()
  id: number;
}

@InputType()
export class CreatePostInput {
  @Field()
  title: string;

  @Field()
  message: string;
}

@InputType()
export class UpdatePostInput {
  @Field()
  id!: number;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  message?: string;
}

@InputType()
export class DeletePostInput {
  @Field()
  id!: number;
}

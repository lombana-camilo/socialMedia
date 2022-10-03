import { BeforeCreate, Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, InputType, Int, ObjectType } from "type-graphql";


@Entity()
@ObjectType()
export class User {
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
  name: string;

  @Field(() => String)
  @Property({ type: "text", unique: true })
  email: string;

  // Not exposing pwd with Field
  @Property({ type: "text" })
  password: string;
}

@InputType()
export class SignUpInput {
  @Field()
  name!: string;

  @Field()
  email!: string;

  @Field()
  password!: string;
}

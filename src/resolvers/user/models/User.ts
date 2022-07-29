
import { ID, Field, ObjectType, InputType } from "type-graphql";

@ObjectType({ description: 'this object represents the user list' })
export class User {

      @Field((type) => ID)
      id: string;

      @Field((type) => String, { description: 'Nombre del usuario' })
      username: string;


      @Field((type) => Date)
      createAt: Date;

      @Field((type) => Date)
      updateAt: Date;


      constructor(options: Partial<User> = {}) {
            options.id && (this.id = options.id);
            options.username && (this.username = options.username);
            options.createAt && (this.createAt = options.createAt);
            options.updateAt && (this.updateAt = options.updateAt);
      }
}

@InputType()
export class UserInput implements Pick<User, "username"> {
      @Field()
      username: string;
}
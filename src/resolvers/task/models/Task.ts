// describiremos una clase con las propiedades y campos de Grahpql
import { ObjectType, Field, ID, InputType } from "type-graphql";

@ObjectType({ description: 'Object representing task in list task' })
export class Task {

      @Field(() => ID)
      id: number;

      @Field()
      title: string;

      @Field()
      description: string;

      @Field({ defaultValue: false })
      dateExpiration: boolean;

      /*
      @Field()
      creationDate: Date;
      */

      constructor(options: Partial<Task> = {}) {
            options.id && (this.id = options.id);
            options.title && (this.title = options.title);
            options.description && (this.description = options.description);
            options.dateExpiration && (this.dateExpiration = options.dateExpiration);
            //options.creationDate && (this.creationDate = options.creationDate);
      }
}

@InputType()
export class TaskInput implements Pick<Task, "title" | "description" | "dateExpiration"> {
      @Field()
      title: string;

      @Field()
      description: string;

      @Field()
      dateExpiration: boolean;
}
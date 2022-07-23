// describiremos una clase con las propiedades y campos de Grahpql
import { boolean, string } from "@tsed/schema";
import { ObjectType, Field, ID, InputType } from "type-graphql";

@ObjectType({ description: 'Object representing task in list task' })
export class Task {

      @Field(() => ID, { description: 'id de la tarea' })
      readonly id: string;

      @Field(type => String, { description: 'titulo de la tarea' })
      title: string;

      @Field(type => String, { description: 'descripcion de la tarea' })
      description: string;

      @Field(type => Boolean, { description: 'Fecha de expicion de una tarea' })
      dateExpiration: boolean;
      /*
      @Field()
      readonly createdAt: Date;
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
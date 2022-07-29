// describiremos una clase con las propiedades y campos de Grahpql
import { Any, DateTime, datetime } from "@tsed/schema";
import { ResolverService } from "@tsed/typegraphql";
import { ObjectType, Field, ID, InputType, buildSchema } from "type-graphql";
import { resolvers } from "@generated/type-graphql";
/*
const schema = await buildSchema({
      resolvers,
      dateScalarMode: "timestamp", // "timestamp" or "isoDate"
    });
    */

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


      //TODO: el tipo de dato es incorrecto buscar datetime
      @Field(type => Date)
      readonly createAt: Date;

      constructor(options: Partial<Task> = {}) {
            options.id && (this.id = options.id);
            options.title && (this.title = options.title);
            options.description && (this.description = options.description);
            options.dateExpiration && (this.dateExpiration = options.dateExpiration);
            options.createAt && (this.createAt = options.createAt);
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
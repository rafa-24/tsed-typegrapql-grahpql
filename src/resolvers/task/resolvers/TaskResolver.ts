import { ResolverService } from "@tsed/typegraphql";
import { Query, Arg, Mutation } from "type-graphql";
import { Task, TaskInput } from "../models/Task";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

@ResolverService(Task)
export class TaskResolver {

      // Leer la lista de Task 
      @Query(Returns => [Task])
      async findAllTask() {
            const allTask = await prisma.task.findMany();
            console.log(allTask);
            return allTask;
      }


      // Leer una task en especifico 
      @Query(Returns => Task)
      async findTaskById(@Arg('id') id: string) {

            const task = prisma.task.findUnique({
                  where: {
                        id: id
                  }
            });
            return task;
      }

      // Crear una nueva tarea 
      @Mutation(() => Task)
      async createTask(@Arg('input') input: TaskInput) {
            const newTask = await prisma.task.create({
                  data: {
                        title: input.title,
                        description: input.description,
                        dateExpiration: input.dateExpiration
                  }
            });
            console.log(newTask);
            return newTask;
      }



      // Actualizar una tarea
      @Mutation(() => Task)
      async updateTask(
            @Arg("id") id: string,
            @Arg("input") input: TaskInput
      ): Promise<any> {
            const taskUpdate = prisma.task.update({
                  where: {
                        id: id
                  },
                  data: {
                        title: input.title,
                        description: input.description,
                        dateExpiration: input.dateExpiration
                  }
            });
            return taskUpdate;
      }



      // Eliminar una tarea 
      @Mutation(() => Task)
      async deleteTask(@Arg('id') id: string) {
            const taskDelete = prisma.task.delete({
                  where: {
                        id: id
                  }
            });
            return taskDelete;
      }
}


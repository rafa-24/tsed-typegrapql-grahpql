import { ResolverService } from "@tsed/typegraphql";
import { Query, Arg, Mutation, Ctx } from "type-graphql";
import { Task, TaskCreateInput, TaskUpdateInput } from "@generated/type-graphql";
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
      async findTaskById(@Arg('id') id: string, @Ctx() context: any) { // contexto
            const task = context.prisma.task.findUnique({
                  where: {
                        id: id
                  }
            });
            console.log(context);
            return task;
      }

      // Crear una nueva tarea 
      @Mutation(() => Task)
      async createTask(@Arg('input') input: TaskCreateInput) {
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
            @Arg("input") input: TaskUpdateInput
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


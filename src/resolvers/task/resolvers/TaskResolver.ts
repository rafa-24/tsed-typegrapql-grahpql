import { string } from "@tsed/schema";
import { ResolverService } from "@tsed/typegraphql";
import { Query, Arg, Mutation } from "type-graphql";
import { Task, TaskInput } from "../models/Task";




@ResolverService(Task)
export class TaskResolver {
      // inyeccion de dependencias

      private task: Task[] = [
            { id: '1', title: 'compras', description: 'ir de compra al super', dateExpiration: false },
            { id: '2', title: 'LOL', description: 'Jugar al lol', dateExpiration: false },
            { id: '3', title: 'tarea', description: 'hacer tarea', dateExpiration: false }
      ]


      // Leer la lista de Task
      @Query(Returns => [Task])
      async findAllTask() {
            return await this.task
      }


      // Leer una task en especifico
      @Query(Returns => Task)
      async findTaskById(@Arg('id') id: string) {
            const task = await this.task.find(index => index.id === id);
            return task;
      }


      @Mutation(() => Task)
      async createTask(@Arg('input') input: TaskInput) {
            const newTask = {
                  // convertir un string a number
                  id: String(this.task.length + 1),
                  ...input,
            }

            this.task.push(newTask);
            return newTask;
      }

      @Mutation(() => Task)
      async updateTask(
            @Arg("id") id: string,
            @Arg("input") input: TaskInput
      ): Promise<Task> {
            const task = this.task.find(index => index.id === id);

            if (!task) {
                  throw new Error("User not found")
            }

            const updateTask = {
                  ...task,
                  ...input,
            }

            this.task = this.task.map(index => (index.id === id ? updateTask : index))

            return updateTask;
      }


      @Mutation(() => [Task])
      async deleteTask(@Arg('id') id: string) {
            const task = this.task.findIndex(index => index.id === id);
            this.task.splice(task, 1);
      }
}




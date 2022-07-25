import { Injectable } from "@tsed/di";
import { Task } from "../resolvers/task/models/Task";

@Injectable()
export class TaskService {
      async findById(id: string) {
            return new Task({ id });
      }

      async findAll(query: any) {
            return [];
      }

      async create(task: any) {
            task = {
                  id: 1,
                  title: "compras",
                  description: "ir de compras al super",
                  expirationDate: false
            }
            return task;
      }


}
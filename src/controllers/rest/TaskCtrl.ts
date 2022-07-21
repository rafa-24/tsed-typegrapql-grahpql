import { Get, Put, Post, Delete } from "@tsed/schema";
import { Controller } from "@tsed/di";
import { PathParams, Res, BodyParams } from "@tsed/common";

interface Task {
      id: string;
      title: string;
      description: string;
      expirationDate: boolean;
}


@Controller('/task')
export class TaskCtrl {
      @Get()
      async findAll(): Promise<string> {
            return 'esto retorna todas las Task';
      }

      @Get('/:id')
      async finAllOne(@PathParams('id') id: string): Promise<string> {
            return `retornando la task con id: ${id}`;
      }

      @Post('/create')
      async create(@Res() res: Res, @BodyParams() task: any): Promise<any> {
            return res.status(201).json({
                  message: 'Se a creado una nueva Task',
                  newTask: task
            });
      }

      @Put('/:id')
      async update(@Res() res: Res, @PathParams('id') id: string, @BodyParams() task: any): Promise<any> {
            if (id === '1') {
                  return res.status(200).json({
                        message: `se actualizo la Task con el id ${id}`,
                        updateTask: task
                  });
            } else {
                  return 'Id invalido :(';
            }
      }

      @Delete('/:id')
      delete(@Res() res: Res, @PathParams('id') id: string) {
            return res.status(200).json({
                  message: `se ha eliminado tarea con id: ${id}`,
            });
      }





}
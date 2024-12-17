import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.entity';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getAllTasks(): Promise<Task[]> {
    return this.taskService.getAllTasks();
  }

  @Post()
  async create(@Body() newTaskObj: { description: string; isCompleted: boolean }) {
    return this.taskService.createTask(newTaskObj); 
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: number) {
    await this.taskService.deleteTask(id);
    return { message: 'Task deleted successfully' };
  }

  @Put(':id')
  async updateTask(@Param('id') id: number, @Body('description') description: string) {
    return this.taskService.updateTask(id, description);
  }
}

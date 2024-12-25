import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/createTask.dto';
import { UpdateTaskDto } from './dto/updateTask.dto';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getAllTasks(): Promise<Task[]> {
    return this.taskService.getAllTasks();
  }

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.createTask(createTaskDto); 
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: number) {
    await this.taskService.deleteTask(id);
    return { message: 'Task deleted successfully' };
  }

  @Put(':id')
  async updateTask(
    @Param('id') id: number, 
    @Body() updateTaskDto: UpdateTaskDto
  ) {
    return this.taskService.updateTask(id, updateTaskDto);
  }

  @Put('toggle/:id')
  async toggleTaskCompletion(
    @Param('id') id: number
  ) {
    return this.taskService.toggleTaskCompletion(id);
  }
}

import { Injectable,  NotFoundException  } from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/core';
import { Task } from './task.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { CreateTaskDto } from './dto/createTask.dto';
import { UpdateTaskDto } from './dto/updateTask.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) 
    private readonly taskRepository: EntityRepository<Task>,
  ) {}

  async getAllTasks(): Promise<Task[]> {
    return this.taskRepository.findAll();
  }

  async createTask(newTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.taskRepository.create({
      description: newTaskDto.description,
      isCompleted: newTaskDto.isCompleted,
    })

    await this.taskRepository.getEntityManager().persistAndFlush(task);

    return task
  }

  async deleteTask(id: number): Promise<void> {
    const task = await this.taskRepository.findOne({ id });
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    await this.taskRepository.getEntityManager().removeAndFlush(task);
  }

  async updateTask(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.taskRepository.findOne({ id });
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    task.description = updateTaskDto.description;
    await this.taskRepository.getEntityManager().flush(); 

    return task;
  }

  async toggleTaskCompletion(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne({ id });
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    task.isCompleted = !task.isCompleted;
    
    await this.taskRepository.getEntityManager().flush();
    
    return task;
  }
}

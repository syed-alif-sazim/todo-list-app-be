import { Injectable } from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/core';
import { Task } from './task.entity';
import { InjectRepository } from '@mikro-orm/nestjs';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) 
    private readonly taskRepository: EntityRepository<Task>,
  ) {}

  async getAllTasks(): Promise<Task[]> {
    return this.taskRepository.findAll();
  }

  async createTask(newTaskObj: { description: string; isCompleted: boolean }): Promise<Task> {
    const task = this.taskRepository.create({
      description: newTaskObj.description,
      is_completed: newTaskObj.isCompleted,
    })

    await this.taskRepository.getEntityManager().persistAndFlush(task);

    return task
  }
}
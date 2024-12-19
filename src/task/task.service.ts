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
}

import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'tasks' })
export class Task {
  @PrimaryKey()
  id!: number;

  @Property()
  description!: string;

  @Property({ fieldName: 'is_completed' })
  isCompleted!: boolean;
}

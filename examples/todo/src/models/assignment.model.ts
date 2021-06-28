import {Entity, model, property} from '@loopback/repository';

@model()
export class Assignment extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  todoId?: number;

  @property({
    type: 'number',
  })
  personId?: number;

  constructor(data?: Partial<Assignment>) {
    super(data);
  }
}

export interface AssignmentRelations {
  // describe navigational properties here
}

export type AssignmentWithRelations = Assignment & AssignmentRelations;

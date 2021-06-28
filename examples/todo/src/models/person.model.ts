import {Entity, model, property, hasMany} from '@loopback/repository';
import {Todo} from './todo.model';
import {Assignment} from './assignment.model';

@model()
export class Person extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @hasMany(() => Todo, {through: {model: () => Assignment}})
  todos: Todo[];

  constructor(data?: Partial<Person>) {
    super(data);
  }
}

export interface PersonRelations {
  // describe navigational properties here
}

export type PersonWithRelations = Person & PersonRelations;

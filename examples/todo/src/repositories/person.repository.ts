import {inject, Getter} from '@loopback/core';
import {
  DefaultCrudRepository,
  repository,
  HasManyThroughRepositoryFactory,
} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Person, PersonRelations, Todo, Assignment} from '../models';
import {AssignmentRepository} from './assignment.repository';
import {TodoRepository} from './todo.repository';

export class PersonRepository extends DefaultCrudRepository<
  Person,
  typeof Person.prototype.id,
  PersonRelations
> {
  public readonly todos: HasManyThroughRepositoryFactory<
    Todo,
    typeof Todo.prototype.id,
    Assignment,
    typeof Person.prototype.id
  >;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('AssignmentRepository')
    protected assignmentRepositoryGetter: Getter<AssignmentRepository>,
    @repository.getter('TodoRepository')
    protected todoRepositoryGetter: Getter<TodoRepository>,
  ) {
    super(Person, dataSource);
    this.todos = this.createHasManyThroughRepositoryFactoryFor(
      'todos',
      todoRepositoryGetter,
      assignmentRepositoryGetter,
    );
    this.registerInclusionResolver('todos', this.todos.inclusionResolver);
  }
}

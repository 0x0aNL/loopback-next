// Copyright IBM Corp. 2018,2020. All Rights Reserved.
// Node module: @loopback/example-todo
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Todo, TodoRelations, Person, Assignment} from '../models';
import {AssignmentRepository} from './assignment.repository';
import {PersonRepository} from './person.repository';

export class TodoRepository extends DefaultCrudRepository<
  Todo,
  typeof Todo.prototype.id,
  TodoRelations
> {

  public readonly people: HasManyThroughRepositoryFactory<Person, typeof Person.prototype.id,
          Assignment,
          typeof Todo.prototype.id
        >;

  constructor(@inject('datasources.db') dataSource: DbDataSource, @repository.getter('AssignmentRepository') protected assignmentRepositoryGetter: Getter<AssignmentRepository>, @repository.getter('PersonRepository') protected personRepositoryGetter: Getter<PersonRepository>,) {
    super(Todo, dataSource);
    this.people = this.createHasManyThroughRepositoryFactoryFor('people', personRepositoryGetter, assignmentRepositoryGetter,);
    this.registerInclusionResolver('people', this.people.inclusionResolver);
  }
}

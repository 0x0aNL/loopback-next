// Copyright IBM Corp. 2019. All Rights Reserved.
// Node module: @loopback/boot
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {juggler} from '../../..';

export class DbDataSource extends juggler.DataSource {
  static dataSourceName = 'db';

  constructor() {
    super({name: 'db'});
  }
}

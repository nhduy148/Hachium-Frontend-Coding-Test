import path from 'path';

import { ITask } from '@libs/types';
import { JSONFile, Low } from 'jddb';
import lodash from 'lodash';

import { readEntityFile } from './data/helpers';

const databaseFile = path.join(process.cwd(), '', 'database.json');

export const TASK_TABLE = 'tasks';

interface DbSchema {
  [TASK_TABLE]: ITask[];
}

// Extend Low class with a new `chain` field
class LowWithLodash<T> extends Low<T> {
  chain: lodash.ExpChain<this['data']> = lodash.chain(this).get('data');
}

const adapter = new JSONFile<DbSchema>(databaseFile);
const db = new LowWithLodash(adapter);

export async function getDb() {
  await db.read();
  return db;
}

export const seedDatabase = async () => {
  const tasks = readEntityFile(TASK_TABLE);

  await db.read();

  db.data = {
    tasks,
  };

  // seed database with test data
  await db.write();
};

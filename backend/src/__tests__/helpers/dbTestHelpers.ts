import { Pool, PoolClient } from 'pg';
require('dotenv').config();

if (typeof process.env.DATABASE_URL !== 'string') {
  throw new Error('DATABASE_URL is not set');
}

export const DATABASE_URL_TEST: string = process.env.DATABASE_URL; // change to test db

interface PoolMap {
  [key: string]: Pool;
}
const pools: PoolMap = {};

type DbTestFn = (client: PoolClient) => void;

afterAll(() => {
  return Promise.all(
    Object.keys(pools).map(async (key) => {
      try {
        const pool = pools[key];
        delete pools[key];
        await pool.end();
      } catch (e) {
        console.error(e);
      }
    })
  );
});

const withDbFromUrl = async (url: string, fn: DbTestFn) => {
  if (!pools[url]) {
    pools[url] = new Pool({ connectionString: url });
  }
  const pool = pools[url];
  const client = await pool.connect();
  await client.query(`BEGIN ISOLATION LEVEL SERIALIZABLE`);

  try {
    await fn(client);
  } catch (e) {
    if (typeof e.code === 'string' && e.code.match(/^[0-9A0Z]{5}$/)) {
      console.error([e.message, e.code, e.detail, e.hint, e.where].join('\\n'));
    }
    fail('error');
  } finally {
    await client.query(`ROLLBACK`);
    await client.query(`RESET ALL`);
    await client.release();
  }
};

export const withRootDb = (fn: DbTestFn) =>
  withDbFromUrl(DATABASE_URL_TEST, fn);

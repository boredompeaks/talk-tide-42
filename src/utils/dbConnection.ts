import { createPool } from './db';

let pool: any = null;

export const getConnection = () => {
  if (!pool) {
    pool = createPool();
  }
  return pool;
};

export const query = async (sql: string, params?: any[]) => {
  const connection = await getConnection();
  try {
    const [results] = await connection.execute(sql, params);
    return results;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
};
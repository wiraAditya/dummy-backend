import mysql, { PoolConnection } from "mysql2/promise";
import * as dotenv from "dotenv";

dotenv.config();
const host = process.env.MYSQL_HOST;
const user = process.env.MYSQL_USERNAME;
const pass = process.env.MYSQL_PASSWORD;
const db = process.env.MYSQL_DATABASE;

const pool = mysql.createPool({
  connectionLimit: 10,
  host: host,
  user: user,
  password: pass,
  database: db,
});

(async () => {
  const connection = await pool.getConnection();
  try {
    console.log("Pool Connected!");
    connection.release();
  } catch (err: any) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("Database connection was closed.");
    }
    if (err.code === "ER_CON_COUNT_ERROR") {
      console.error("Database has too many connections.");
    }
    if (err.code === "ECONNREFUSED") {
      console.error("Database connection was refused.");
    }
  }
})();
export default pool;
export async function queryAndConvertToJson<T>(
  query: string,
  param?: any[]
): Promise<T> {
  const [data] = await pool.query(query, param);
  return data as T;
}
export async function getConnection(): Promise<PoolConnection> {
  return pool.getConnection();
}

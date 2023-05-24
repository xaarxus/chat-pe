import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const poll = new Pool({
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  user: process.env.DB_USER,
  port: Number(process.env.DB_PORT),
});

export default poll;
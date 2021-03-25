import { createConnection } from 'typeorm';
import path from 'path';

const logging =
  process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'text'

const path_entities =
  process.env.NODE_ENV == 'development' ? '../entities/**/**.ts' : '../entities/**/**.js';

async function connect() {
  await createConnection({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: 5432,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [
      path.join(__dirname, path_entities)
    ],
    synchronize: true,
    logging,
    extra: {
      ssl: {
        rejectUnauthorized: false
      }
    }
  });
  console.log('Database connected');
}

export default connect;

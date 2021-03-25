import { createConnection } from 'typeorm';
import path from 'path';

const logging =
  process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'text'

const path_entities =
  process.env.NODE_ENV == 'development' ? '../entities/**/**.ts' : '../entities/**/**.js';

const paths = path.join(__dirname, path_entities);

async function connect() {
  console.log(paths);
  await createConnection({
    type: 'postgres',
    // host: process.env.DATABASE_HOST,
    // port: 5432,
    // username: process.env.DATABASE_USER,
    // password: process.env.DATABASE_PASSWORD,
    // database: process.env.DATABASE_NAME,
    url: process.env.DATABASE_URL,
    entities: [
      paths
    ],
    synchronize: process.env.NODE_ENV == 'development',
    logging,
    ssl: process.env.NODE_ENV == 'production'
  });
  console.log('Database connected');
}

export default connect;

import { createConnection, ConnectionOptions } from 'typeorm';
import path from 'path';

const logging =
  process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'text'


function createOption(): ConnectionOptions {
  const opions: ConnectionOptions = {
    type: 'postgres',
    entities: [path.join(__dirname, '../entities/**/**.entity{.ts,.js}')]
  }

  if (process.env.NODE_ENV == 'development') {
    return {
      ...opions,
      host: process.env.DATABASE_HOST,
      port: 5432,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      synchronize: true,
      logging: true
    }
  }

  return {
    ...opions,
    url: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  }
}

async function connect() {
  const options = createOption();
  await createConnection(options);
  console.log('Database connected');
}

export default connect;

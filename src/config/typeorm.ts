import { createConnection, ConnectionOptions } from 'typeorm';
import path from 'path';

const DEFAULT_OPTIONS:ConnectionOptions = {
  type: 'postgres',
  entities: [path.join(__dirname, '../entities/**/**.entity{.ts,.js}')],
  logging: ['query', 'error']
}

class TypeORMConnection {
  private isProduction:boolean;

  constructor(isProduction:boolean) {
    this.isProduction = isProduction;
  }

  public async connect() {
    const connection = await this.createConnection();
    if (this.isProduction) await connection.synchronize(false);
    console.log('Database Connected');
  }

  private async createConnection() {
    const options = this.options();
    return await createConnection(options);
  }

  private options(): ConnectionOptions {
    if (this.isProduction) return this.productionOptions();

    return this.developmentOptions();
  }

  private productionOptions(): any {
    return {
      ...DEFAULT_OPTIONS,
      url: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    }
  }

  private developmentOptions():any {
    return {
      ...DEFAULT_OPTIONS,
      host: process.env.DATABASE_HOST,
      port: 5432,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      synchronize: true
    }
  }
}

export default TypeORMConnection;

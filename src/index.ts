import "reflect-metadata";
import dotenv from 'dotenv';

dotenv.config();

import startApp from './app';
import { connectDB } from './config';

const port = process.env.PORT;

async function main() {
  connectDB();
  const app = await startApp();
  app.listen(port);
  console.log('Run server on', `http://localhost:${port}/graphql`);
}

main();

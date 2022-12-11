import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { todoRouter } from './routers/todo-router.js';

export function start(port = 3000) {
  const app = express();

  app.use(cors());
  app.use(bodyParser.json());

  app.use('/todo', todoRouter());

  app.listen(port, () => {
    console.log('Server listening on port', port)
  })
}
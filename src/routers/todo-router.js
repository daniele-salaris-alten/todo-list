import express from 'express';
import { TodoService } from '../services/todo.service.js';

export function todoRouter() {
  const router = express.Router();

  // list all
  router.get('/', (req, res) => {
    const todoService = TodoService.getInstance(); 
    res.json(todoService.getAll())
  });

  // create
  router.post('/', (req, res) => {
    const todoService = TodoService.getInstance();
    console.log(req.body);
    // console.log(req);
    const { label } = req.body;

    if (typeof label !== 'string') {
      res.status(400);
      res.send();
      return;
    }

    const todo = todoService.createOne(label);

    res.status(201);
    res.json(todo);
  });

  // get one
  router.get('/:id', (req, res) => {
    const todoService = TodoService.getInstance();
    const { id } = req.params;

    const todo = todoService.getOne(id);

    if (!todo) {
      res.status(404);
      res.json({error: `Unable to find a todo with id: ${id}` })
      return;
    }

    res.json(todo)
  });

  // delete one
  router.delete('/:id', (req, res) => {
    const todoService = TodoService.getInstance(); 
    const deleted = todoService.deleteOne(req.params.id);

    if (!deleted) {
      res.status(404);
      res.json({error: `Unable to find a todo with id: ${id}` })
      return;
    }

    res.status(204);
    res.send();
  });

  return router;
}

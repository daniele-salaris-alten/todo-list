import { Todo } from "../models/todo.model.js";

export class TodoService {
  static _instance;

  static getInstance() {
    if (!TodoService._instance) {
      TodoService._instance = new TodoService();
    }

    return TodoService._instance;
  }

  todos = [];
  currentId = 1;

  constructor() {
    this.createOne('Grocery');
    this.createOne('Pay bills');
    this.createOne('Take out trash');
  }

  createOne(label) {
    const id = this.generateId();
    const todo = new Todo(id, label);

    this.todos.push(todo);

    return todo;
  }

  deleteOne(id) {
    const index = this.todos.findIndex(todo => todo.id == id);

    if (index < 0) {
      return false;
    }

    this.todos.splice(index, 1)
    
    return true;
  }

  getOne(id) {
    return this.todos.find(todo => todo.id == id);
  }

  getAll() {
    return this.todos;
  }

  generateId() {
    return this.currentId++;
  }
}

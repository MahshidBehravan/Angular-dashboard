import { Component, inject } from '@angular/core';
import { TodoStore } from '../../todo.store';
import { TodoItem } from "../todo-item/todo-item";

@Component({
  selector: 'app-todo-list',
  imports: [TodoItem],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css',
})
export class TodoList {
store=inject(TodoStore);
constructor() {
  
  this.store.loadTodos();
}
}

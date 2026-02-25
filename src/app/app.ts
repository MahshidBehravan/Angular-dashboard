import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoStore } from './todo.store';
import { TodoList } from "./components/todo-list/todo-list";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-root',
  imports: [FormsModule, TodoList, RouterOutlet],
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
store=inject(TodoStore);
title='';

addTodo() {
  if (this.title.trim()) {
    this.store.addTodo(this.title);
    this.title = '';
  }
}
}

import { Component, EventEmitter, input, Input, output, Output } from '@angular/core';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todo-item',
  imports: [],
  standalone: true,
  templateUrl: './todo-item.html',
  styleUrl: './todo-item.css',
})
export class TodoItem {

  todo = input.required<Todo>();
  toggle = output<number>();
  delete = output<number>();
}

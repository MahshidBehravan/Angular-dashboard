import { Component, inject } from '@angular/core';
import { TaskStore } from '../task.store';

@Component({
  selector: 'app-tasks',
  imports: [],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
  standalone: true
})
export class Tasks {
  store=inject(TaskStore);

  reload(){
    this.store.loadTasks();
  }

}

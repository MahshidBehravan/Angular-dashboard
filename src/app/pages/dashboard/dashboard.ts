import { Component, inject } from '@angular/core';
import { DashboardStore } from '../dashboard.store';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

  store=inject(DashboardStore);

  constructor() {  
    this.store.loadTodos();
  }
  onSearch(term: string) {
    this.store.searchTerm.set(term);
  }
  reload(){
    this.store.loadTodos();
  }
  inc() {
    this.store.Inc();
  }
  dec(){
    this.store.Dec();
  }
}

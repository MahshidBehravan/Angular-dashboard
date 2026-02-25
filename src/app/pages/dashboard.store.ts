import { computed, inject, Injectable, signal } from "@angular/core";
import { DashboardApiService } from "../services/dashboard-api.services";
import { Todo } from "../models/todo.model";
import {debounceTime, distinctUntilChanged} from "rxjs/operators"
import { takeUntilDestroyed, toObservable } from "@angular/core/rxjs-interop";

@Injectable({
    providedIn:"root"
})
export class DashboardStore {
    private api=inject(DashboardApiService)

    counter=signal(0);
    loading=signal(false);
    todos=signal<Todo[]>([]);
    error=signal<string|null>(null);
    searchTerm=signal("");
    debouncedSearchTerm=signal("");
    
    total=computed(()=>this.todos().length);
    doneCount=computed(()=>this.todos().filter(t=>t.completed).length);

    constructor() {
        toObservable(this.searchTerm).
        pipe(debounceTime(300),
        distinctUntilChanged(),
         takeUntilDestroyed()).subscribe((term)=>{
            this.debouncedSearchTerm.set(term);
            console.log("Search term:",term);
        });
    }
    Inc(){
        this.counter.update(c=>c+1);
    }
    Dec(){
        this.counter.update(c=>c-1);
    }

    filteredTodos=computed(()=>{
        const term=this.debouncedSearchTerm().toLowerCase();
        const list=this.todos();
        if(!term) return list;
        return list.filter(t=>t.title.toLowerCase().includes(term));
    });
    async loadTodos(){
        this.loading.set(true);
        this.error.set(null);
        try {
            const data=await this.api.getTodos();
            this.todos.set(data);
        } catch (err) {
            this.error.set("Failed to load todos");
        }
        finally{
            this.loading.set(false);
        }
    }


}
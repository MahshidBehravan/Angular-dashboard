import { computed, inject, Injectable, signal } from "@angular/core";
import { Task } from "../models/task.model";
import { TaskService } from "../services/task-api.service";
import { takeUntilDestroyed, toObservable } from "@angular/core/rxjs-interop";
import { debounceTime, distinctUntilChanged } from "rxjs";

@Injectable({
    providedIn:"root"
})
export class TaskStore{
    private api=inject(TaskService);

    tasks=signal<Task[]>([]);
    loading=signal(false);
    error=signal<string|null>(null);
    filter=signal<"all"|"active"|"completed">("all");
    searchTerm=signal("");
    debouncedSearchTerm=signal("");

    total=computed(()=>this.tasks().length);
    activeCount=computed(()=>this.tasks().filter(t=>!t.completed).length);
    completedCount=computed(()=>this.tasks().filter(t=>t.completed).length);
    donePercent=computed(()=>this.total() ? (this.completedCount()/this.total())*100 : 0);

    constructor() {
        toObservable(this.searchTerm).pipe(
            debounceTime(300),
            distinctUntilChanged(),
            takeUntilDestroyed()
        ).subscribe((term)=>{
            this.debouncedSearchTerm.set(term);
        });
    }

    visibleTasks=computed(()=>{
        let list=this.tasks();
        const term=this.debouncedSearchTerm().toLowerCase();
        if(this.filter()!=="all"){
            const isCompleted=this.filter()==="completed";
            list=list.filter(t=>t.completed===isCompleted);
        }
        if(term){
            list=list.filter(t=>t.title.toLowerCase().includes(term));  
        }
        return list;
    });

    async loadTasks(){
        this.loading.set(true);
        this.error.set(null);   
        try{
           const data=await this.api.getTasks();
              this.tasks.set(data);
        }
        catch(err){
            this.error.set("Failed to load tasks");
        }
        finally{
            this.loading.set(false);
        }

    }


}
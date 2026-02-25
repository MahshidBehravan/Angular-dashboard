import { computed, inject, Injectable, signal, Signal } from "@angular/core";
import { Todo } from "./models/todo.model";
import { TodoApiService } from "./services/todo-api.services";

@Injectable({
  providedIn: "root",
})
export class TodoStore {
    private todo = signal<Todo[]>([]);
    private api=inject(TodoApiService);

    filter = signal<"all" | "active" | "completed">("all");

    allTodos = computed(() => this.todo());

    filteredTodos = computed(() => {
        const filter = this.filter();
        const todos = this.todo();
        if (filter === "active") {
            return todos.filter((t) => !t.completed);
        } if (filter === "completed") {
            return todos.filter((t) => t.completed);
        }
        else {          
              return todos;
        }
    });

    addTodo(title: string) {
        const newTodo: Todo = {
            id: Date.now(),
            title,
            completed: false,
        };
        this.todo.update((todos) => [...todos, newTodo]);
    }

    toggle(id: number) {
        this.todo.update((todos) =>
            todos.map((t) =>
                t.id === id ? { ...t, completed: !t.completed } : t
            )
        );
        
    }
    delete(id: number) {
        this.todo.update((todos) => todos.filter((t) => t.id !== id));
    }
    setFilter(filter: "all" | "active" | "completed") {
        this.filter.set(filter);
    }
    activeCount = computed(() => {
        return this.todo().filter(t => !t.completed).length;
    });
    completedCount = computed(() => {
        return this.todo().filter(t => t.completed).length;
    });
    loading = signal(false);
    error = signal<string | null>(null);

    async loadTodos() {
        this.loading.set(true);
        this.error.set(null);
        try {
            const data=await this.api.getTodos();
            this.todo.set(
                data.map((t) => ({
                    id: t.id,
                    title: t.title,
                    completed: !!t.completed,
            })
            )
        
        )
        } catch (err) {
            this.error.set("Failed to load todos");
        } finally {
            this.loading.set(false);
        }
    }
}
import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { Todo } from "../models/todo.model";

@Injectable({providedIn:"root"})
export class DashboardApiService{
    private http= inject(HttpClient);

    async getTodos(): Promise<Todo[]>{
        return firstValueFrom(
            this.http.get<Todo[]>("https://jsonplaceholder.typicode.com/todos?_limit=5"));
    }

}
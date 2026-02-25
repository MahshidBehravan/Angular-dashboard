import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Todo } from "../models/todo.model";
import { firstValueFrom } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class TodoApiService {
private httpclient=inject(HttpClient);

async getTodos():Promise<Todo[]> {
  return firstValueFrom(this.httpclient.get<Todo[]>("https://jsonplaceholder.typicode.com/todos?_limit=10"));
}
}

import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Task } from "../models/task.model";
import { firstValueFrom } from "rxjs";

@Injectable({
    providedIn:"root"
})
export class TaskService{
private httpclient=inject(HttpClient);

async getTasks():Promise<Task[]>{
    return firstValueFrom(
        this.httpclient.get<Task[]>("https://jsonplaceholder.typicode.com/todos?_limit=10")); 
}

}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../type/Task';
import { TaskCreate } from '../type/TaskCreate';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private todoUrl = "http://localhost:8080/api/todo";

  constructor(private http: HttpClient) { }

  public update = (idTodo: string, id: string, task: Task) : Observable<Task> => {
    return this.http.put<Task>(`${this.todoUrl}/${idTodo}/task/${id}`, task);
  }

  public createTask = (idTodo: string, task: TaskCreate) : Observable<Task> => {
    return this.http.post<Task>(`${this.todoUrl}/${idTodo}/task`, task);
  }
}

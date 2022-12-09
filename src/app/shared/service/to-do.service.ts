import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from '../type/Task';
import { TaskCreate } from '../type/TaskCreate';
import { ToDo } from '../type/ToDo';
import { ToDoCreate } from '../type/ToDoCreate';
import { ToDos } from '../type/ToDos';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {
  private toDoUrl = "http://localhost:8080/api/todo";

  constructor(private http: HttpClient) { }

  public findAll = () : Observable<ToDos> => {
    return this.http.get<ToDos>(`${this.toDoUrl}`);
  }

  public findById = (id: string) : Observable<ToDo> => {
    return this.http.get<ToDo>(`${this.toDoUrl}/${id}`);
  }

  public createToDo = (toDo: ToDoCreate) : Observable<ToDo> => {
    return this.http.post<ToDo>(`${this.toDoUrl}`, toDo);
  }
}

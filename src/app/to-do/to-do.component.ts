import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../shared/service/task.service';
import { ToDoService } from '../shared/service/to-do.service';
import { Task } from '../shared/type/Task';
import { TaskCreate } from '../shared/type/TaskCreate';
import { ToDo } from '../shared/type/ToDo';
import { ToDoCreate } from '../shared/type/ToDoCreate';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.scss']
})
export class ToDoComponent implements OnInit{
  public toDos: ToDo[] = [];
  public toDo: ToDo = {
    id: '',
    title: '',
    tasks: []
  };

  public taskLabel = new FormControl();
  public toDoTitle = new FormControl();

  constructor(private toDoService : ToDoService, 
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService) {
    this.route.params.subscribe( params => {this.toDo.id = params['id']?params['id']:'';});
   }

  ngOnInit(): void {
    if(this.toDo.id != '') {
      this.toDoService.findById(this.toDo.id).subscribe({
          next: (response) => { this.toDo = response; },
          error: (responseError) => { 
            this.toastr.error(responseError.error, responseError.error.error);
            this.router.navigate(['/todo']); }
      });
    }
    else {
      this.toDoService.findAll().subscribe({
        next: (toDosReponse) => { this.toDos = toDosReponse.toDos; },
        error: (responseError) => { 
          this.toastr.error(responseError.error, responseError.error.error);
        }
      })
    }
  }

  public addTask = () => {
    let task : TaskCreate = {
      label: this.taskLabel.value
    }
    this.taskService.createTask(this.toDo.id, task).subscribe({
      next: (taskCreated) => { this.toDo.tasks.push(taskCreated) },
      error: (responseError) => { 
        this.toastr.error(responseError.error.errors[0].defaultMessage, responseError.error.error);
      }
    })
  }

  public createToDo = () => {
    let toDo: ToDoCreate = {
      title: this.toDoTitle.value,
    }
    this.toDoService.createToDo(toDo).subscribe({
      next: (toDoCreated) => { this.toDo = toDoCreated;
        this.router.navigate(['/todo/', { id: this.toDo.id }], { relativeTo: this.route }); },
      error: (responseError) => { 
        this.toastr.error(responseError.error.errors[0].defaultMessage, responseError.error.error);
      }
    })
  }

  public checkboxChange = ($event: any, task: Task) => {
    let taskCopy = Object.assign({}, task)
    task.status = $event.target.checked? 'COMPLETE' : 'IN_PROGRESS'
    this.updateTask(task, taskCopy)
  }

  private updateTask = (task: Task, taskCopy: Task) => {
    this.taskService.update(this.toDo.id, task.id, task).subscribe({
      next: (taskCreated) => { task = taskCreated},
      error: (responseError) => { 
        this.toastr.error(responseError.error, responseError.error.error);
        task=taskCopy; }
    });
  }
}

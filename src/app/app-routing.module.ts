import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ToDoComponent } from './to-do/to-do.component';

const routes: Routes = [{ path: 'todo', component: ToDoComponent },
                        { path: 'todo/:id', component: ToDoComponent },
                        { path: '', redirectTo: 'todo', pathMatch: 'full'},
                        { path: '**', redirectTo: 'todo', pathMatch: 'full'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

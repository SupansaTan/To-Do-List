import { NgModule } from '@angular/core'
import { Routes } from '@angular/router'
import { NativeScriptRouterModule } from '@nativescript/angular'

import { HomeComponent } from './pages/home/home.component'
import { AddTaskComponent } from './pages/add-task/add-task.component'
import { TaskDetailComponent } from './pages/task-detail/task-detail.component'

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'add', component: AddTaskComponent },
  { path: 'detail/:id', component: TaskDetailComponent }
]

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [NativeScriptRouterModule],
})
export class AppRoutingModule {}

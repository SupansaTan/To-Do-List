import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptModule } from '@nativescript/angular'
import { NativeScriptFormsModule } from "@nativescript/angular";

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HomeComponent } from './pages/home/home.component'
import { TopBarComponent } from './components/top-bar/top-bar.component'
import { TaskListComponent } from './components/task-list/task-list.component'
import { AddTaskComponent } from './pages/add-task/add-task.component'

import { TaskService } from './task.service'
import { DatePipe } from '@angular/common'


@NgModule({
  bootstrap: [AppComponent],
  imports: [NativeScriptModule, AppRoutingModule, NativeScriptFormsModule ],
  declarations: [AppComponent, HomeComponent, TopBarComponent, TaskListComponent, AddTaskComponent],
  providers: [TaskService, DatePipe],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}

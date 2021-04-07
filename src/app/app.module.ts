import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptModule } from '@nativescript/angular'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HomeComponent } from './pages/home/home.component'
import { TopBarComponent } from './components/top-bar/top-bar.component'
import { TaskListComponent } from './components/task-list/task-list.component'

import { TaskService } from './task.service'

@NgModule({
  bootstrap: [AppComponent],
  imports: [NativeScriptModule, AppRoutingModule ],
  declarations: [AppComponent, HomeComponent, TopBarComponent, TaskListComponent ],
  providers: [TaskService],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}

import { NgModule } from '@angular/core'
import { Routes } from '@angular/router'
import { NativeScriptRouterModule } from '@nativescript/angular'

import { HomeComponent } from './pages/home/home.component'
import { AddTaskComponent } from './pages/add-task/add-task.component'
import { EditTaskComponent } from './pages/edit-task/edit-task.component'
import { TaskDetailComponent } from './pages/task-detail/task-detail.component'
import { PhotoViewerComponent } from './pages/photo-viewer/photo-viewer.component'
import { AboutUsComponent } from './pages/about-us/about-us.component'

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'add', component: AddTaskComponent },
  { path: 'detail/:id', component: TaskDetailComponent },
  { path: 'edit/:id', component: EditTaskComponent },
  { path: 'photo/:src', component: PhotoViewerComponent },
  { path: 'about', component: AboutUsComponent },
]

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [NativeScriptRouterModule],
})
export class AppRoutingModule {}

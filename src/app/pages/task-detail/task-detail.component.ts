import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from '@angular/router';

import { Task } from "~/app/task";
import { TaskService } from "../../task.service";
import { Location} from "@angular/common";

@Component ({
    selector: "TaskDetail",
    templateUrl: "./task-detail.component.html",
})

export class TaskDetailComponent {
    task;
   constructor(private route: ActivatedRoute,
               private taskService: TaskService,
               private location: Location) {}
   ngOnInit() {
 
  }

  
}
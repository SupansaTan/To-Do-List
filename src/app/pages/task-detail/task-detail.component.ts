import { Component, OnInit } from "@angular/core";
import { ActivatedRoute ,Router} from '@angular/router';

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
              private router: Router,
               private taskService: TaskService,
               private location: Location) {}
   ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    const id = Number(routeParams.get('id'));
    this.task = this.taskService.getTask(id);
  }
  edit(id){
    this.router.navigate(['/edit', id ]);
  }
  delete(id){
    this.taskService.deleteTask(id)
  }

}
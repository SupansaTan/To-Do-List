import { Component} from "@angular/core";
import { ActivatedRoute, Router} from '@angular/router';
import { Task } from "~/app/task";
import { TaskService } from "../../task.service";
import { Location} from "@angular/common";

@Component ({
    selector: "TaskDetail",
    templateUrl: "./task-detail.component.html",
    styleUrls: ['./task-detail.component.css'],
})
export class TaskDetailComponent {
    task;
   constructor(public route: ActivatedRoute,
              public taskService: TaskService,
              public location: Location,
              public router: Router) {}

  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    const id = Number(routeParams.get('id'));
    this.task = this.taskService.getTask(id);
  }

  public photoViewer(src: string){
    this.router.navigate(['/photo', src ]);
  }
}
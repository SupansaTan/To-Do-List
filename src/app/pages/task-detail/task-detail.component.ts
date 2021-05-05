import { Component} from "@angular/core";
import { ActivatedRoute, Router} from '@angular/router';
import { Task } from "~/app/task";
import { TaskService } from "../../task.service";
import { Location} from "@angular/common";
import { Page } from "@nativescript/core";

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
              public router: Router, 
              private page: Page) {
    this.page.on('loaded', () => {
      const routeParams = this.route.snapshot.paramMap;
      const id = Number(routeParams.get('id'));
      this.task = this.taskService.getTask(id);
      
      this.task==undefined ? this.location.back() : this.task // if the task not exist
    });
  }

  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    const id = Number(routeParams.get('id'));
    this.task = this.taskService.getTask(id);
  }

  public photoViewer(src: string){
    this.router.navigate(['/photo', src ]);
  }
}
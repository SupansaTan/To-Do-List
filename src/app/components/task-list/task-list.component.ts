import { Component } from "@angular/core";
import { TaskService } from "~/app/task.service";
import { Page } from "@nativescript/core";
import { Location } from '@angular/common'

@Component ({
    selector: "task-list",
    templateUrl: "./task-list.component.html",
    styleUrls: ["./task-list.component.css"],
    moduleId: module.id,
})

export class TaskListComponent {
    public tasks : Array<any>;

    public constructor(private taskService : TaskService, public page: Page) { 
        this.tasks = this.taskService.getTasks();
    }

}
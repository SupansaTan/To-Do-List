import { Component, OnInit } from "@angular/core";
import { TaskService } from "~/app/task.service";
import { Task } from '../../task'

@Component ({
    selector: "task-list",
    templateUrl: "./task-list.component.html",
    styleUrls: ["./task-list.component.css"],
    providers: [TaskService],
})

export class TaskListComponent {
    tasks : Array<Task>;

    constructor(private taskService : TaskService) { 
        this.tasks = taskService.getTasks();
    }

}
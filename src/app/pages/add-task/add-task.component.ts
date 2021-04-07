import { Component, OnInit } from "@angular/core";

@Component ({
    selector: "add-task",
    templateUrl: "./add-task.component.html",
    styleUrls: ['./add-task.component.css'],
})

export class AddTaskComponent {
    task_name : string;
    task_detail: string;

    constructor() { }

}
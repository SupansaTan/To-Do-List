import { Component } from "@angular/core";
import { TaskService } from "~/app/task.service";
import { DatePipe } from '@angular/common'
import { Location } from '@angular/common'

@Component ({
    selector: "add-task",
    templateUrl: "./add-task.component.html",
    styleUrls: ['./add-task.component.css'],
    moduleId: module.id,
})

export class AddTaskComponent {
    minDate: Date = new Date()
    maxDate: Date = new Date(2045, 4, 12)

    task_name : string;
    task_detail: string;
    date : Date;
    time : Date;

    public constructor(private taskService: TaskService,public datepipe: DatePipe, public location: Location) {
        this.date = new Date();
        this.time = new Date();
    }

    public add() {
        let datetime = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate(),
            this.time.getHours(),this.time.getMinutes())
        this.taskService.addTask(this.task_name, this.task_detail, datetime)
        this.location.back()
    }
}
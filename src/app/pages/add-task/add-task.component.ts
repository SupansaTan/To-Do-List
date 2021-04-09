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
    datetime : Date;

    public constructor(private taskService: TaskService,public datepipe: DatePipe, public location: Location) {
        this.datetime = new Date();
    }

    public add() {
        let datetime_format = this.datepipe.transform(this.datetime, 'dd/MM/yyyy h:mm a');
        this.taskService.addTask(this.task_name, this.task_detail, this.datetime)
        this.location.back()
    }
}
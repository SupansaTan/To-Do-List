import { Component, OnInit } from "@angular/core";
import { TimePicker } from "@nativescript/core";
import { TaskService } from "~/app/task.service";
import { DatePipe } from '@angular/common'
import { Router } from '@angular/router'
import {Location} from '@angular/common'

@Component ({
    selector: "add-task",
    templateUrl: "./add-task.component.html",
    styleUrls: ['./add-task.component.css'],
    providers: [TaskService],
})

export class AddTaskComponent {
    task_name : string;
    task_detail: string;
    time = new Date();
    date = new Date();

    constructor(public taskService: TaskService, public datepipe: DatePipe, public location: Location) { }

    add(){
        let date_format = this.datepipe.transform(this.date, 'dd/MM/yyyy');
        let time_format = this.datepipe.transform(this.time, 'h:mm a');
        this.taskService.addTask(this.task_name, date_format + "," + time_format)
        this.location.back()
    }
}
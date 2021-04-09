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
    task_name : string;
    task_detail: string;
    time = new Date();
    date = new Date();

    public constructor(private taskService: TaskService, public datepipe: DatePipe, public location: Location) { }

    public add(){
        let date_format = this.datepipe.transform(this.date, 'dd/MM/yyyy');
        let time_format = this.datepipe.transform(this.time, 'h:mm a');
        this.taskService.addTask(this.task_name, this.task_detail, date_format + "," + time_format)
        this.location.back()
    }
}
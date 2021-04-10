import { Component } from "@angular/core";
import { TaskService } from "~/app/task.service";
import { Page } from "@nativescript/core";
import { Location } from '@angular/common';
import { DatePipe } from '@angular/common'


@Component ({
    selector: "task-list",
    templateUrl: "./task-list.component.html",
    styleUrls: ["./task-list.component.css"],
    moduleId: module.id,
})

export class TaskListComponent {
    public tasks : Array<any>;

    public constructor(private taskService : TaskService, public datepipe: DatePipe, public page: Page) { 
        this.tasks = this.taskService.getTasks();
    }

    public countdown(toDate : Date) {
        var now = new Date();

        /* when getting task data from app settings date will be string type 
           that will change to Date type */
        if(typeof toDate === "string"){
            toDate = new Date(Date.parse(toDate));
        }

        var difference = toDate.getTime() - now.getTime(); // time difference
        
        var seconds = Math.floor(difference / 1000);
        var mins = Math.floor(seconds / 60);
        var hours = Math.floor(mins / 60);
        var days = Math.floor(hours / 24);

        hours %= 24;
        mins %= 60;

        return this.formatString('Countdown : {0} {1} {2}', this.pluralize(days,'day'),
            this.pluralize(hours,'hour'),this.pluralize(mins,'min'))
    }

    /* check noun is plural or not */
    pluralize(count, noun, suffix = 's'){
        return `${count} ${noun}${count !== 1 ? suffix : ''}`
    }

    formatString(str: string, ...val: string[]) {
        for (let index = 0; index < val.length; index++) {
          str = str.replace(`{${index}}`, val[index]);
        }
        return str;
    }
}
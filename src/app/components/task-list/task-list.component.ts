import { Component } from "@angular/core";
import { TaskService } from "~/app/task.service";
import { Page } from "@nativescript/core";
import { Location } from '@angular/common';
import { DatePipe } from '@angular/common'
import { Dialogs } from '@nativescript/core'

@Component ({
    selector: "task-list",
    templateUrl: "./task-list.component.html",
    styleUrls: ["./task-list.component.css"],
    moduleId: module.id,
})

export class TaskListComponent {
    checklist_id : number;
    approach_deadline: boolean;

    public tasks : Array<any>;

    public constructor(private taskService : TaskService, public datepipe: DatePipe, public page: Page) { 
        this.tasks = this.taskService.getTasks();
        this.approach_deadline = false;
    }

    public countdown(toDate : Date) {
        this.approach_deadline = false;
        var now = new Date();

        /* when getting task data from app settings date will be string type 
           that will change to Date type */
        if(typeof toDate === "string"){
            toDate = new Date(Date.parse(toDate));
        }
        
        var difference = toDate.getTime() - now.getTime(); // time difference in milliseconds

        var seconds = Math.trunc(difference / 1000);
        var mins = Math.trunc(seconds / 60); // differences in minutes
        var hours = Math.trunc(mins / 60);  // difference in hours
        var days = Math.trunc(hours / 24);  // difference in days

        let hour = hours % 24;
        let min  = mins % 60;

        // print seconds
        return this.formatString('Countdown : {0} {1} {2}', this.pluralize(days,'day'),
            this.pluralize(hour,'hour'),this.pluralize(min,'min'))
    }

    public convertDatetime(datetime: Date){
        let now = Date.now()
        let date_now = this.datepipe.transform(now, 'dd/MM/yyyy')
        let dueDate = this.datepipe.transform(datetime, 'dd/MM/yyyy h:mm a').split(" ")

        if (date_now == dueDate[0]){
            return this.formatString('Today, {0} {1}',dueDate[1],dueDate[2])
        }
        else {
            return this.formatString('{0}, {1} {2}',dueDate[0],dueDate[1],dueDate[2])
        }
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

    checklist(id : number){
        this.checklist_id = id
        setTimeout(() => {
            this.taskService.deleteTask(id)
            this.checklist_id = undefined
        }, 300);
    }
}
import { Component, AfterViewInit, ChangeDetectorRef } from "@angular/core";
import { TaskService } from "~/app/task.service";
import { Page } from "@nativescript/core";
import { Location } from '@angular/common';
import { DatePipe } from '@angular/common'
import { Router } from "@angular/router";

@Component ({
    selector: "task-list",
    templateUrl: "./task-list.component.html",
    styleUrls: ["./task-list.component.css"],
    moduleId: module.id,
})

export class TaskListComponent implements AfterViewInit {
    checklist_id : number;

    public tasks : Array<any>;

    public constructor(private router:Router,private taskService : TaskService, 
        public datepipe: DatePipe, public page: Page, private cdRef: ChangeDetectorRef) { 
        this.tasks = this.taskService.getTasks();
    }

    ngAfterViewInit() {
        this.cdRef.detectChanges(); 
    }

    public countdown(toDate : Date, id: number) {
        let now = new Date();
        let difference = toDate.getTime() - now.getTime(); // time difference in milliseconds

        let seconds = Math.trunc(difference / 1000);
        let mins = Math.trunc(seconds / 60); // differences in minutes
        let hours = Math.trunc(mins / 60);  // difference in hours
        let days = Math.trunc(hours / 24);  // difference in days

        let hour = hours % 24;
        let min  = mins % 60;
        
        if(toDate >= now){
            return this.formatString('Countdown : {0} {1} {2}', this.pluralize(days,'day'),
            this.pluralize(hour,'hour'),this.pluralize(min,'min'))
        }
        else{
            // overdue date
            try {
                this.taskService.setOverdue(id, true) 
            }
            finally {
                return this.formatString('Countdown : {0} {1} {2} overdue', this.pluralize(Math.abs(days),'day'),
                this.pluralize(Math.abs(hour),'hour'),this.pluralize(Math.abs(min),'min'))
            }
        }
    }

    public convertDatetime(datetime: Date){
        let now = Date.now()
        let date_now = this.datepipe.transform(now, 'dd/MM/yyyy')
        let dueDate = this.datepipe.transform(datetime, 'dd/MM/yyyy h:mm a').split(" ")

        if (date_now == dueDate[0]){
            // duedate is today
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
    
    toDetail(id : number) {
        this.router.navigate(['/detail', id ]);
    }
}
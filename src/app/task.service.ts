import { Injectable } from '@angular/core';
import * as AppSettings from '@nativescript/core/application-settings'

import { Task } from './task'

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    private tasks: Array<any>;

    public constructor() { 
        const openFirstTime = AppSettings.getBoolean("FistTime");

        if(openFirstTime == null || openFirstTime == undefined){
            this.tasks = [
                {
                    id: 1,
                    name: 'Assignment 4',
                    date: '17/04/63,7:30 AM'
                },
                {
                    id: 2,
                    name: 'Assignment 5',
                    date: '20/04/63,9:00 PM'
                },
                {
                    id: 3,
                    name: 'Network Lab',
                    date: '26/05/63,6:00 PM'
                }
            ]
            AppSettings.setString("TasksData", JSON.stringify(this.tasks));
            AppSettings.setBoolean("FistTime", false);
        }
        else {
            this.tasks = JSON.parse(AppSettings.getString("TasksData"));
        }
    }

    public getTasks(): Array<any> {
        return this.tasks;
    }

    public getTask(id: number){
        return this.tasks[id];
    }

    public addTask(name: string, date: string){
        const last_id = this.tasks[this.tasks.length-1].id
        this.tasks.push(
            {
              'id': last_id+1,
              'name': name,
              'date': date
            }
        );
        AppSettings.setString("TasksData", JSON.stringify(this.tasks));
    }
}
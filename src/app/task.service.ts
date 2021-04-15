import { Injectable } from '@angular/core';
import * as AppSettings from '@nativescript/core/application-settings'
import { LocalNotifications } from '@nativescript/local-notifications';
import { Task } from './task'

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    private tasks: Array<any>;

    public constructor() { 
        const openFirstTime = AppSettings.getBoolean("FistTime");

        /* check using app first time or not */
        if(openFirstTime == null || openFirstTime == undefined){
            this.tasks = []
            AppSettings.setString("TaskData", JSON.stringify(this.tasks)); // store tasks data
            AppSettings.setBoolean("FistTime", false);
        }
        else {
            this.tasks = JSON.parse(AppSettings.getString("TaskData")); // get task data that store in app settings
        }
    }

    public getTasks(): Array<any> {
        return this.tasks;
    }

    public getTask(id: number){
        return this.tasks.filter(x => x.id == id)[0];
    }

    public addTask(name: string, detail:string, datetime:Date, photoPath:Array<string>, notify:boolean){
        let last_id;

        /* get id */
        if (this.tasks.length == 0){
            last_id = 0
        }
        else {
            last_id = this.tasks[this.tasks.length-1].id
        }

        this.tasks.push(
            {
              'id': last_id+1,
              'name': name,
              'detail': detail,
              'due_date': datetime,
              'photo': photoPath,
              'notify': notify,
            }
        );
        AppSettings.setString("TaskData", JSON.stringify(this.tasks));

        if(notify){
            this.setNotify(last_id+1, name, datetime)
        }
    }

    public deleteTask(id:number){
        for(let i = 0; i < this.tasks.length; i++) {
            if(this.tasks[i].id == id) {
              this.tasks.splice(i, 1);
              AppSettings.setString("TaskData", JSON.stringify(this.tasks))
              break;
            }
        }
    }

    private setNotify(id:number, name:string, datetime:Date){
        let date_notify = new Date(datetime.getFullYear(), datetime.getMonth(), datetime.getDate()-1,
        datetime.getHours(), datetime.getMinutes())

        LocalNotifications.schedule([
            {
                id: id,
                title: 'Task Reminder',
                body: "ครบกำหนดพรุ่งนี้: " + name,
                badge: 1,
                at: date_notify,
                forceShowWhenInForeground: true,
            },
        ]).then(
            (scheduledIds) => {
                console.log('Notification id(s) scheduled: ' + JSON.stringify(scheduledIds));
            },
            (error) => {
                console.log('scheduling error: ' + error);
            }
        );
    }
}
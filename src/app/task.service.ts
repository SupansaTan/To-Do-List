import { Injectable, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Task } from './task'

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    tasks : Array<Task>;

    constructor() { 
        this.tasks = [
            {
                id: 1,
                name: 'Assignment 4',
                date: '17/04/63'
            },
            {
                id: 2,
                name: 'Assignment 5',
                date: '20/04/63'
            },
            {
                id: 3,
                name: 'Network Lab',
                date: '26/05/63'
            }
        ]
    }

    getTasks(){
        return this.tasks;
    }

    getTask(id: number){
        return this.tasks[id];
    }

    addTask(name: string, date: string){
        const last_id = this.tasks[this.tasks.length-1]['id']
        this.tasks.push(
            {
              id: last_id+1,
              name: name,
              date: date
            }
        );
    }
}
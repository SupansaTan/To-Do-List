import { Component } from "@angular/core";
import { Router,ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'
import { Dialogs } from '@nativescript/core'
import { TaskService } from "../../task.service";

@Component ({
    selector: "top-bar",
    templateUrl: "./top-bar.component.html",
    styleUrls: ['./top-bar.component.css'],
})

export class TopBarComponent {
    task;
    id : number;

    constructor(public route: ActivatedRoute,
                public router: Router, 
                public location: Location,
                public taskService: TaskService) { }
    
    ngOnInit() {
        const routeParams = this.route.snapshot.paramMap;
        this.id = Number(routeParams.get('id'));
        this.task = this.taskService.getTask(this.id);
    }

    back_to_homepage(){
        
        const confirmOptions = {
            title: 'Are you sure?',
            message: 'The task will not save.',
            okButtonText: 'Yes',
            cancelButtonText: 'No',
        }
        
        Dialogs.confirm(confirmOptions).then(result => {
            if(result){
                this.location.back()
            }
        })
    }

    back_to_detail(){
        this.location.back()
    }
    
    edit(id){
    this.router.navigate(['/edit', id ]);
    }

    delete(id){
        this.taskService.deleteTask(id);
        this.location.back();
    }
}
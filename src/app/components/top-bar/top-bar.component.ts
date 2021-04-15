import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { Location } from '@angular/common'
import { Dialogs } from '@nativescript/core'

@Component ({
    selector: "top-bar",
    templateUrl: "./top-bar.component.html",
    styleUrls: ['./top-bar.component.css'],
})

export class TopBarComponent {

    constructor(public router: Router, public location: Location) { }
    
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
}
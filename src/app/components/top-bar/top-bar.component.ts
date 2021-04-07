import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';


@Component ({
    selector: "top-bar",
    templateUrl: "./top-bar.component.html",
    styleUrls: ['./top-bar.component.css'],
})

export class TopBarComponent {

    constructor(private router: Router) { }

}
import { Component} from "@angular/core";
import { ActivatedRoute} from '@angular/router';
import { Task } from "~/app/task";
import { TaskService } from "../../task.service";
import { Location} from "@angular/common";

@Component ({
    selector: "edit-task",
    templateUrl: "./edit-task.component.html",
    styleUrls: ['./edit-task.component.css'],
})

export class EditTaskComponent {

    constructor() { }

}
import { Component } from "@angular/core";
import { TaskService } from "~/app/task.service";
import { DatePipe } from '@angular/common'
import { Location } from '@angular/common'
import * as camera from "@nativescript/camera";
import { Image, ImageAsset } from "@nativescript/core";
import { ImageSource, knownFolders, path } from '@nativescript/core';
import { flatMap, map } from 'rxjs/operators';
import { from } from 'rxjs';
import * as fs from "@nativescript/core/file-system";

@Component ({
    selector: "add-task",
    templateUrl: "./add-task.component.html",
    styleUrls: ['./add-task.component.css'],
    moduleId: module.id,
})

export class AddTaskComponent {
    minDate: Date = new Date()
    maxDate: Date = new Date(2045, 4, 12)
    showButtons : boolean;
    hasImage : boolean; // for check task has image or not

    task_name : string;
    task_detail: string;
    task_photo: Array<string> = [];
    date : Date;
    time : Date;

    imagePath: string | undefined;

    public constructor(private taskService: TaskService,public datepipe: DatePipe, public location: Location) {
        this.date = new Date();
        this.time = new Date();
        this.showButtons = false;
        this.hasImage = false;
    }

    public add() {
        let datetime = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate(),
            this.time.getHours(),this.time.getMinutes())
        
        this.taskService.addTask(this.task_name, this.task_detail, datetime, this.task_photo)
        this.location.back()
    }

    public toggleVisible(){
        this.showButtons = !this.showButtons;
    }

    takePhoto(): void {
        if (!camera.isAvailable()) {
            throw new Error('Camera not available');
        }
        from(camera.requestPermissions()).pipe(
            flatMap(() => camera.takePicture()),
            flatMap((imageAsset: ImageAsset) => ImageSource.fromAsset(imageAsset)),
            map((imageSource: ImageSource) => {
                const len_photo = this.task_photo.length+1
                const fileName = this.task_name + len_photo + ".jpg";
                const photoFilePath = this.createPhotoPath(fileName);
                // Save photo in full quality to file
                const success: boolean = imageSource.saveToFile(photoFilePath, 'jpg');
                if (!success) {
                    throw new Error('Error during saving photo image to file ' + photoFilePath);
                }
                return photoFilePath;
            })
        ).subscribe(photoFilePath => {
            console.log('Photofilepath ' + photoFilePath);
            this.imagePath = photoFilePath;
            this.task_photo.push(this.imagePath)
        }, error => {
            console.log(error);
        })
    }

    private createPhotoPath(fileName: string): string {
        const documentFolders = knownFolders.documents();
        if (!documentFolders) {
            throw new Error('Documents folder is not available');
        }

        // gets or creates photo folder
        let photoFolderPath;
        if (this.task_name != ""){
            photoFolderPath = documentFolders.getFolder(this.task_name);
        }
        else{
            photoFolderPath = documentFolders.getFolder("temp");
        }

        // gets or creates empty file
        const photoFile = photoFolderPath.getFile(fileName);
        if (!photoFile) {
            throw new Error('Cannot create photo file');
        }
        this.hasImage = true; // set image visible
        return photoFile.path;
    }
}
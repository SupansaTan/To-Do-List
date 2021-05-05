import { ActivatedRoute} from '@angular/router';
import { Component } from "@angular/core";
import { TaskService } from "~/app/task.service";
import { Location } from '@angular/common'
import * as camera from "@nativescript/camera";
import { ImageAsset } from "@nativescript/core";
import { ImageSource, knownFolders} from '@nativescript/core';
import { flatMap, map } from 'rxjs/operators';
import { from } from 'rxjs';
import * as imagepicker from "@nativescript/imagepicker";
import { Router } from "@angular/router";

@Component ({
    selector: "edit-task",
    templateUrl: "./edit-task.component.html",
    styleUrls: ['./edit-task.component.css'],
})

export class EditTaskComponent {
    task;
    date: Date;
    time: Date;
    task_name: string;
    task_detail: string;
    task_date: Date;
    task_photo: Array<string> = [];
    task_notify: boolean;
    hasImage: boolean;
    imagePath: string | undefined;
    
    constructor(public route: ActivatedRoute,
               public taskService: TaskService,
               public location: Location,
               public router: Router) {
                const routeParams = this.route.snapshot.paramMap;
                const id = Number(routeParams.get('id'));
                this.task = this.taskService.getTask(id);
                this.task_name = this.task.name
                this.task_detail = this.task.detail
                this.task_photo = this.task.photo
                this.task_notify = this.task.notify
                this.date = this.task.due_date
                this.time = this.task.due_date
    }
    
    ngOnInit() {

    }

    public edit(){ 
        let overdue : boolean
        let now = new Date()
        let datetime = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate(),
            this.time.getHours(),this.time.getMinutes())
        datetime < now ? overdue=true : overdue=false

        this.taskService.editTask(this.task.id,this.task_name, this.task_detail, datetime, this.task_photo, this.task_notify, overdue)
        this.location.back()
    }
    
    public getRandomString() {
        // random hash generator for generate file name
        var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var result = '';
        for ( var i = 0; i < 16; i++ ) {
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }
        return result;
    }

    public takePhoto(): void {
        if (!camera.isAvailable()) {
            throw new Error('Camera not available');
        }
        from(camera.requestPermissions()).pipe(
            flatMap(() => camera.takePicture()),
            flatMap((imageAsset: ImageAsset) => ImageSource.fromAsset(imageAsset)),
            map((imageSource: ImageSource) => {
                // set photo name and path
                const fileName = this.getRandomString() + ".jpg";
                const photoFilePath = this.createPhotoPath(fileName);

                // save photo in full quality to file
                const success: boolean = imageSource.saveToFile(photoFilePath, 'jpg');
                if (!success) {
                    throw new Error('Error during saving photo image to file ' + photoFilePath);
                }
                return photoFilePath;
            })
        ).subscribe(photoFilePath => {
            this.task_photo.push(photoFilePath)
            this.hasImage = true; // set image visible
            console.log('Photofilepath ' + photoFilePath);
        }, error => {
            console.log(error);
        })
    }

    public pickPhoto() {
        let that = this;
        let context = imagepicker.create({
            mode: "multiple"
        });
        
        context
            .authorize()
            .then(function() {
                return context.present();
            })
            .then(function(selection) {
                selection.forEach(function(selected) {
                    // process the selected image
                    let source = ImageSource.fromAsset(selected)
                    source.then((imageSource: ImageSource) => {
                        // set photo name and path & save it
                        let fileName = that.getRandomString() + ".jpg";
                        const photoFilePath = that.createPhotoPath(fileName);
                        const success: boolean = imageSource.saveToFile(photoFilePath, 'jpg');

                        if (!success) {
                            throw new Error('Error during saving photo image to file ' + photoFilePath);
                        }
                        else {
                            // save successfully
                            that.imagePath = photoFilePath;
                            that.task_photo.push(that.imagePath)
                            that.hasImage = true; // set image visible
                        }
                        return photoFilePath;
                    })
                })
            }).catch(function (e) {
                console.log(e);
            });
    }

    private createPhotoPath(fileName: string): string {
        const documentFolders = knownFolders.documents();
        if (!documentFolders) {
            throw new Error('Documents folder is not available');
        }

        // gets or creates photo folder
        let photoFolderPath;
        photoFolderPath = documentFolders.getFolder('images');

        // gets or creates empty file
        const photoFile = photoFolderPath.getFile(fileName);
        if (!photoFile) {
            throw new Error('Cannot create photo file');
        }
        return photoFile.path;
    }

    public photoViewer(src: string){
        this.router.navigate(['/photo', src ]);
    }
}

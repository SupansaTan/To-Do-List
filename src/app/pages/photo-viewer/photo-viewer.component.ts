import { Component } from "@angular/core";
import { ActivatedRoute } from '@angular/router';

@Component ({
    selector: "photo-view",
    templateUrl: "./photo-viewer.component.html",
    styleUrls: ['./photo-viewer.component.css'],
})

export class PhotoViewerComponent {
    image_src: string;

    constructor(public route: ActivatedRoute) { 
        const routeParams = this.route.snapshot.paramMap
        this.image_src = routeParams.get('src')
    }

}
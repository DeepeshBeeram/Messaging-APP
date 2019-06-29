import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';
import { AlertifyService } from 'src/app/Services/Alertify.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_models/User';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

@Component({
  selector: 'app-memberDetail',
  templateUrl: './memberDetail.component.html',
  styleUrls: ['./memberDetail.component.css']
})
export class MemberDetailComponent implements OnInit {

  user: User;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];



  constructor(private userSer: UserService, private alert: AlertifyService,
              private activeR: ActivatedRoute) { }

  ngOnInit() {
    this.activeR.data.subscribe(data => {
      this.user = data['user'];
    });

    this.galleryOptions = [
  {
      width: '500px',
      height: '500px',
      imagePercent: 100,
      thumbnailsColumns: 4,
      imageAnimation: NgxGalleryAnimation.Slide,
      preview: false
  }
];

    this.galleryImages = this.getImages();

  }

  getImages() {

    const images = [];


    for (let i = 0; i < this.user.photos.length ; i++){
      images.push({
        small: this.user.photos[i].url,
        medium: this.user.photos[i].url,
        big: this.user.photos[i].url,
        description: this.user.photos[i].description
      });

    }
    return images;
  }







}

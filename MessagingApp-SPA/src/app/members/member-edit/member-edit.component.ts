import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/_models/User';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/Services/Alertify.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {

  user: User;
  @ViewChild('editform') editUserProfile: NgForm
  constructor(private router: ActivatedRoute, private alert: AlertifyService) { }

  ngOnInit() {
    this.router.data.subscribe(data => {
      this.user = data['user'];
    });
    
  }

  updateUser() {
    console.log(this.user);
    this.alert.success('Updated Successful');
    this.editUserProfile.reset(this.user);
  }

}

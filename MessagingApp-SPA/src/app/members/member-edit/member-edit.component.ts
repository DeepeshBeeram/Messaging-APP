import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { User } from 'src/app/_models/User';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/Services/Alertify.service';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/Services/user.service';
import { AuthService } from 'src/app/Services/Auth.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {

  user: User;
  @ViewChild('editform') editUserProfile: NgForm
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if(this.editUserProfile.dirty){
      $event.returnValue = true;
    }
  }
  constructor(private router: ActivatedRoute, private alert: AlertifyService,
    private userSer: UserService, private auth: AuthService) { }

  ngOnInit() {
    this.router.data.subscribe(data => {
      this.user = data['user'];
    });
    
  }

  updateUser() {
    this.userSer.updateUser(this.auth.decodeToken.nameid, this.user).subscribe(next => {
      this.alert.success('Updated Successful');
      this.editUserProfile.reset(this.user);
    }, error => {
      this.alert.error(error);
    });
    
  }
  

}

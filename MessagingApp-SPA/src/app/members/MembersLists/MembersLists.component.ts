import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { AlertifyService } from '../../Services/Alertify.service';
import { User } from '../../_models/User';

@Component({
  selector: 'app-MembersLists',
  templateUrl: './MembersLists.component.html',
  styleUrls: ['./MembersLists.component.css']
})
export class MembersListsComponent implements OnInit {

  users: User[];

  constructor(private userSer: UserService, private alert: AlertifyService) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userSer.getUsers().subscribe((users: User[]) => {
      this.users = users;
    }, error => {
      this.alert.error(error);
    });

  }

}

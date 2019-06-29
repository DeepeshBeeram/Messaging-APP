import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/Auth.service';
import { AlertifyService } from '../Services/Alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-NavBar',
  templateUrl: './NavBar.component.html',
  styleUrls: ['./NavBar.component.css']
})
export class NavBarComponent implements OnInit {

  model: any = {};

  constructor(public auth: AuthService, private alertify: AlertifyService,
    private router: Router) { }

  ngOnInit() {
  }

  login() {

    this.auth.login(this.model).subscribe(next => {
      this.alertify.success('login succesfully');

    }, error => {
      this.alertify.error('Login Incorrect');

    });

  }


  loggedIn() {
    return this.auth.loggedIn();

  }

  logOut() {

    localStorage.removeItem('token');
    this.router.navigate(['/home']);
    this.alertify.message('Logged Out');

  }

}

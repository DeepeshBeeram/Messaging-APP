import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/Auth.service';

@Component({
  selector: 'app-NavBar',
  templateUrl: './NavBar.component.html',
  styleUrls: ['./NavBar.component.css']
})
export class NavBarComponent implements OnInit {

  model: any = {};

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  login(){

    this.auth.login(this.model).subscribe(next => {
      console.log('login succesfully');


    }, error => {
      console.log('Login Failed');
    });

  }


  loggedIn(){
    const token = localStorage.getItem('token');
    return !!token;
  }

  logOut(){

    localStorage.removeItem('token');
    console.log('Logged Out');
  }

}

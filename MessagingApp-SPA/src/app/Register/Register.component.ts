import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/Auth.service';

@Component({
  selector: 'app-Register',
  templateUrl: './Register.component.html',
  styleUrls: ['./Register.component.css']
})
export class RegisterComponent implements OnInit {

  model: any = {};

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  onCancel(){
    this.model.clear();
  }

  Register(){
    this.auth.Register(this.model).subscribe(() => {

      console.log('Registration Done');
    }, error => {
      console.log('this is error');
    });
  }

}

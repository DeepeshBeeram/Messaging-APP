import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../Services/Auth.service';
import { AlertifyService } from '../Services/Alertify.service';

@Component({
  selector: 'app-Register',
  templateUrl: './Register.component.html',
  styleUrls: ['./Register.component.css']
})
export class RegisterComponent implements OnInit {

  @Output() cancelRegister = new EventEmitter<boolean>();

  model: any = {};

  constructor(private auth: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  onCancel(){
    this.cancelRegister.emit(false);
  }

  Register(){
    this.auth.Register(this.model).subscribe(() => {

      this.alertify.success('Registration Successful');
      
    }, error => {
      this.alertify.error(error);
      
    });
  }

}

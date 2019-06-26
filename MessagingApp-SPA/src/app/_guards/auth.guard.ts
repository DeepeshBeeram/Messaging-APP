import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../Services/Auth.service';
import { AlertifyService } from '../Services/Alertify.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate(): boolean {
    if (this.auth.loggedIn()) {
    return true;
    } else {
      this.alert.error('Trespassing is not allowed');
      this.router.navigate(['/home']);
      return false;
    }
  }

  constructor(private auth: AuthService , private alert: AlertifyService, private router: Router) {}
}

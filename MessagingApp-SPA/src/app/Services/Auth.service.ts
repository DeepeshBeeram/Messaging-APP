import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

   baseurl = environment.apiUrl + 'auth/';
   jwtHelper = new JwtHelperService();
   decodeToken: any;

constructor(private http: HttpClient, private router: Router) { }


login(model: any) {
  return this.http.post(this.baseurl + 'login', model).pipe(
    map((response: any) => {

      const user = response;

      if(user){
      localStorage.setItem('token', user.token);
      this.decodeToken = this.jwtHelper.decodeToken(user.token);
      }

    })

  );
}

Register(model: any){

  return this.http.post(this.baseurl + 'register', model);
}

loggedIn(){
  const  token = localStorage.getItem('token');
  return !this.jwtHelper.isTokenExpired(token);
  

}

}

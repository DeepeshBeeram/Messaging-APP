import { Injectable } from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_models/User';
import { UserService } from '../Services/user.service';
import { AlertifyService } from '../Services/Alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../Services/Auth.service';


@Injectable()

export class MemberEditResolver implements Resolve<User> {
    
    constructor(private userServ: UserService, private alert: AlertifyService,
                private router: Router, private auth: AuthService) {}
    resolve(route: ActivatedRouteSnapshot): Observable<User> {

        return this.userServ.getUserId(this.auth.decodeToken.nameid).pipe(
            catchError(error => {
                this.alert.error('Problem retrieving edit profile data');
                this.router.navigate(['/members']);
                return of(null);
            })
        )

    }

}
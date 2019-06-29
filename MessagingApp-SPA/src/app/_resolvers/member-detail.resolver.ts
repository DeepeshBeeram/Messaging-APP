import { Injectable } from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_models/User';
import { UserService } from '../Services/user.service';
import { AlertifyService } from '../Services/Alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable()

export class MemberDetailResolver implements Resolve<User> {
    
    constructor(private userServ: UserService, private alert: AlertifyService,
                private router: Router) {}
    resolve(route: ActivatedRouteSnapshot): Observable<User> {

        return this.userServ.getUserId(route.params['id']).pipe(
            catchError(error => {
                this.alert.error('Problem retrieving data');
                this.router.navigate(['/members']);
                return of(null);
            })
        )

    }

}
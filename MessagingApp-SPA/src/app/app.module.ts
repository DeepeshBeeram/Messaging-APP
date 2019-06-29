import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { BsDropdownModule, TabsModule } from 'ngx-bootstrap';
import { NgxGalleryModule } from 'ngx-gallery';
import { JwtModule } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { NavBarComponent } from './NavBar/NavBar.component';
import { AuthService } from './Services/Auth.service';
import { HomeComponent } from './Home/Home.component';
import { RegisterComponent } from './Register/Register.component';
import { AlertifyService } from './Services/Alertify.service';
import { ListsComponent } from './Lists/Lists.component';
import { MembersListsComponent } from './members/MembersLists/MembersLists.component';
import { MessagesComponent } from './Messages/Messages.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './router';
import { AuthGuard } from './_guards/auth.guard';
import { UserService } from './Services/user.service';
import { MemberCardComponent } from './members/MemberCard/MemberCard.component';
import { MemberDetailComponent } from './members/memberDetail/memberDetail.component';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';


export function tokenGet(){
   return localStorage.getItem('token');
}

@NgModule({
   declarations: [
      AppComponent,
      NavBarComponent,
      HomeComponent,
      RegisterComponent,
      ListsComponent,
      MembersListsComponent,
      MessagesComponent,
      MemberCardComponent,
      MemberDetailComponent,
      MemberEditComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      NgxGalleryModule,
      BsDropdownModule.forRoot(),
      TabsModule.forRoot(),
      RouterModule.forRoot(appRoutes),
      JwtModule.forRoot({
         config: {
            tokenGetter: tokenGet,
            whitelistedDomains: ['localhost:5000'],
            blacklistedRoutes: ['localhost:5000/api/auth']
         }
      })
   ],
   providers: [
      AuthService,
      AlertifyService,
      AuthGuard,
      UserService,
      MemberDetailResolver,
      MemberEditResolver
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }

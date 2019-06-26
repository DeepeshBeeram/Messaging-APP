import { Routes } from '@angular/router';
import { HomeComponent } from './Home/Home.component';
import { MembersListsComponent } from './MembersLists/MembersLists.component';
import { ListsComponent } from './Lists/Lists.component';
import { MessagesComponent } from './Messages/Messages.component';
import { AuthGuard } from './_guards/auth.guard';


export const appRoutes: Routes = [

    {path: '', component: HomeComponent},

    {path : '' , runGuardsAndResolvers: 'always', canActivate: [AuthGuard],
    children: [
    {path: 'members', component: MembersListsComponent},
    {path: 'lists', component: ListsComponent},
    {path: 'messages', component: MessagesComponent}
    ]

    },

    {path: '**', redirectTo: '', pathMatch: 'full'}



];

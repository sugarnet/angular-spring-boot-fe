import { Routes } from '@angular/router';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { AuthComponent } from './components/auth/auth.component';
import { authGuard } from './guards/auth.guard';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/users/page/0'
    },
    {
        path: 'users',
        component: UserListComponent
    },
    {
        path: 'users/page/:page',
        component: UserListComponent
    },
    {
        path: 'users/create',
        component: UserFormComponent,
        canActivate: [authGuard]
    },
    {
        path: 'users/edit/:id',
        component: UserFormComponent,
        canActivate: [authGuard]
    },
    {
        path: 'login',
        component: AuthComponent
    },
    {
        path: 'forbidden',
        component: ForbiddenComponent
    }
];

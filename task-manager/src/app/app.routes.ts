import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'tasks',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'tasks',
    loadComponent: () =>
      import('./components/tasks/task-list/task-list.component').then(
        (m) => m.TaskListComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'tasks/new',
    loadComponent: () =>
      import('./components/tasks/task-form/task-form.component').then(
        (m) => m.TaskFormComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

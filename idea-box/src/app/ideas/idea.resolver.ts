import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { IdeasService } from './ideas.service';
import { AuthService } from '../auth/auth.service';

export const ideaResolver: ResolveFn<any> = (route, state) => {
  const ideasService = inject(IdeasService);
  const authService = inject(AuthService);

  const id = route.queryParamMap.get('id');

  if (id) {
    return ideasService.getIdeaById(id, authService.currentUser()?.username);
  } else {
    return undefined;
  }
};

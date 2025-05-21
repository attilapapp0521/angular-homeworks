import { Route } from '@angular/router';
import { ListIdeaComponent } from './list-idea/list-idea.component';
import { NewIdeaComponent } from './new-idea/new-idea.component';
import { ideaResolver } from './idea.resolver';
import { IdeaComponent } from './idea/idea.component';

export const routes: Route[] = [
  {
    path: '',
    component: ListIdeaComponent,
  },
  {
    path: 'new',
    component: NewIdeaComponent,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    resolve: { idea: ideaResolver },
  },
  {
    path: ':id',
    component: IdeaComponent,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    resolve: { idea: ideaResolver },
  },
];

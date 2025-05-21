import { Component, DestroyRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { Idea } from '../models/idea.model';
import { IdeasService } from '../ideas.service';
import { switchMap, tap } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '../../auth/auth.service';
import { environment } from '../../../environments/environment';
import { RouterLink } from '@angular/router';
import { VoteComponent } from '../vote/vote/vote.component';

@Component({
  selector: 'app-list-idea',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
    RouterLink,
    VoteComponent,
  ],
  templateUrl: './list-idea.component.html',
  styleUrl: './list-idea.component.scss',
})
export class ListIdeaComponent {
  ideas: Idea[] = [];

  constructor(
    private readonly ideasService: IdeasService,
    private readonly destroyRef: DestroyRef,
    private readonly authService: AuthService
  ) {
    this.listIdeas().subscribe();
  }

  listIdeas() {
    return this.ideasService
      .listIdeas(this.authService.currentUser()?.username)
      .pipe(
        tap((ideas) => (this.ideas = ideas)),
        takeUntilDestroyed(this.destroyRef)
      );
  }

  handleApiResult(event: { success: boolean; error?: string }) {
    if (event.success) {
      this.listIdeas();
    } else {
      console.log(event.error);
    }
  }

  deleteIdea(idea: Idea) {
    this.ideasService
      .deleteIdea(idea, this.authService.currentUser()?.username)
      .pipe(
        switchMap(() => this.listIdeas()),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }
}

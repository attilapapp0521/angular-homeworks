import {
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  Output,
  signal,
} from '@angular/core';
import { Idea } from '../../models/idea.model';
import { IdeasService } from '../../ideas.service';
import { AuthService } from '../../../auth/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, finalize, map, of } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-vote',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './vote.component.html',
  styleUrl: './vote.component.scss',
})
export class VoteComponent {
  @Input() idea!: Idea;
  @Output() apiResult = new EventEmitter<{
    success: boolean;
    error?: string;
  }>();
  isLoading = signal(false);

  constructor(
    private readonly ideasService: IdeasService,
    private readonly authService: AuthService,
    private readonly destroyRef: DestroyRef
  ) {}

  upvote() {
    this.isLoading.set(true);
    this.ideasService
      .upvoteIdea(this.idea, this.authService.currentUser()?.username)
      .pipe(
        map(() => {
          this.apiResult.emit({ success: true });
        }),
        catchError((err) => {
          this.apiResult.emit({ success: false, error: err.message });
          return of(null);
        }),
        finalize(() => this.isLoading.set(false)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  downvote() {
    this.isLoading.set(true);
    this.ideasService
      .downvoteIdea(this.idea, this.authService.currentUser()?.username)
      .pipe(
        map(() => {
          this.apiResult.emit({ success: true });
        }),
        catchError((err) => {
          this.apiResult.emit({ success: false, error: err.message });
          return err;
        }),
        finalize(() => this.isLoading.set(false)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }
}

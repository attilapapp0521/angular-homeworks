import { Component, DestroyRef, Input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { catchError, finalize, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NewIdea } from '../models/new-idea.model';
import { IdeasService } from '../ideas.service';
import { Idea } from '../models/idea.model';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-new-idea',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterLink,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    ReactiveFormsModule,
  ],
  templateUrl: './new-idea.component.html',
  styleUrl: './new-idea.component.scss',
})
export class NewIdeaComponent {
  @Input({ required: false }) idea?: Idea;

  newIdea = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    description: new FormControl<string>('', [Validators.required]),
  });

  isLoading = signal(false);

  constructor(
    private readonly ideasService: IdeasService,
    private readonly destroyRef: DestroyRef,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar,
    private readonly autService: AuthService
  ) {}

  ngOnInit(): void {
    if (this.idea) {
      this.newIdea.setValue({
        name: this.idea.name,
        description: this.idea.description,
      });
    }
  }

  save() {
    this.isLoading.set(true);
    const idea: NewIdea = {
      name: this.newIdea.value.name!,
      description: this.newIdea.value.description!,
    };

    const operation = this.idea
      ? this.ideasService.editIdea(
          this.idea.id,
          idea,
          this.autService.currentUser()?.username
        )
      : this.ideasService.createIdea(
          idea,
          this.autService.currentUser()?.username
        );

    operation
      .pipe(
        tap(() => this.router.navigate(['/ideas'])),
        catchError((e) => {
          this.snackBar.open('Hiba történt a mentés közben', 'OK', {
            duration: 5000,
          });
          throw e;
        }),
        finalize(() => this.isLoading.set(false)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }
}

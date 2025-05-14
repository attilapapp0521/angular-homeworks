import { Component, DestroyRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    RouterLink,
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
})
export class RegistrationComponent {
  email?: string;
  password?: string;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly destroyRef: DestroyRef
  ) {}

  registration() {
    if (this.email && this.password) {
      this.authService
        .registration(this.email, this.password)
        .pipe(
          tap(() => this.router.navigate(['/login'])),
          takeUntilDestroyed(this.destroyRef)
        )
        .subscribe();
    }
  }
}

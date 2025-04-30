import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  username = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    console.log(this.username);

    this.authService.login(this.username);
    this.router.navigate(['/']);
  }
}

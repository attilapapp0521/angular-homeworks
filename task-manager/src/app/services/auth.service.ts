import { Injectable, signal } from '@angular/core';
import { TaskService } from './task.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private username = signal<string | null>(null);

  constructor(private taskService: TaskService, private router: Router) {
    const savedUsername = this.getUsername();
    if (savedUsername) {
      this.username.set(savedUsername);
    }
  }

  login(username: string) {
    this.username.set(username);
    localStorage.setItem('username', username);
    this.taskService.loadTaskForUser(username);
  }

  logout() {
    this.username.set(null);
    localStorage.removeItem('username');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!this.username();
  }

  getUsername(): string | null {
    return localStorage.getItem('username');
  }
}

import { Component, signal } from '@angular/core';
import { TaskComponent } from '../task/task.component';
import { Router, RouterLink } from '@angular/router';
import { Task } from '../../../models/task.model';
import { TaskService } from '../../../services/task.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-task-list',
  imports: [TaskComponent, RouterLink],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent {
  constructor(
    private taskService: TaskService,
    private authService: AuthService,
    private router: Router
  ) {}

  get pendingTasks() {
    return this.taskService.getTasks().filter((task) => !task.isCompleted);
  }

  get completedTasks() {
    return this.taskService.getTasks().filter((task) => task.isCompleted);
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}

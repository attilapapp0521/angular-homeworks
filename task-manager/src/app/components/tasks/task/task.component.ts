import { Component, input, Input, InputSignal, signal } from '@angular/core';
import { Task } from '../../../models/task.model';
import { TaskService } from '../../../services/task.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-task',
  imports: [],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent {
  task: InputSignal<Task> = input.required<Task>();

  constructor(private taskService: TaskService) {}

  markAsDone(taskId: string, username: string) {
    this.taskService.markAsCompleted(taskId, username);
  }
}

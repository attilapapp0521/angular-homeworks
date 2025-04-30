import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TaskService } from '../../../services/task.service';
import { Task } from '../../../models/task.model';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-task-form',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
})
export class TaskFormComponent {
  taskForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private router: Router,
    private authService: AuthService
  ) {
    this.taskForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  addTask(task: Task) {}

  onSubmit() {
    const username = this.authService.getUsername();
    if (!username) {
      this.router.navigateByUrl('/login');
      return;
    }
    this.taskService.addTask(this.taskForm.value, username);
    this.router.navigate(['/tasks']);
  }
}

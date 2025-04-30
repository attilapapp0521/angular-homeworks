import { effect, Injectable, signal } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  tasks = signal<Task[]>([]);

  loadTaskForUser(username: string) {
    const data = localStorage.getItem(`tasks_${username}`);
    this.tasks.set(data ? JSON.parse(data) : []);
  }

  addTask(task: Task, username: string) {
    const newTask: Task = {
      ...task,
      id: crypto.randomUUID(),
      isCompleted: false,
      username,
    };
    this.tasks.set([...this.tasks(), newTask]);
    this.saveTasks(username);
  }

  getTasks() {
    return this.tasks();
  }

  markAsCompleted(taskId: string, username: string) {
    console.log(taskId);

    this.tasks.set(
      this.tasks().map((t) =>
        t.id === taskId ? { ...t, isCompleted: true } : t
      )
    );
    this.saveTasks(username);
  }

  private saveTasks(username: string) {
    if (username) {
      localStorage.setItem(`tasks_${username}`, JSON.stringify(this.tasks()));
    }
  }
}

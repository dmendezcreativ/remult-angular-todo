import { Component } from '@angular/core';
import { ErrorInfo, Remult } from 'remult';
import { Task } from 'src/shared/Task';
import { TasksController } from 'src/shared/TasksController';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'remult-angular-todo';
  constructor(public remult: Remult) { }
  taskRepo = this.remult.repo(Task);
  hideCompleted = false;
  tasks: (Task & { error?: ErrorInfo<Task> })[] = [];
  async fetchTasks() {
    if (!this.taskRepo.metadata.apiReadAllowed) return;
    this.tasks = await this.taskRepo.find({
      limit: 20,
      orderBy: { completed: "asc" },
      where: { completed: this.hideCompleted ? false : undefined }
    });
  }
  ngOnInit() {
    this.fetchTasks();
  }

  async saveTask(task: Task & { error?: ErrorInfo<Task> }) {
    try {
      const savedTask = await this.taskRepo.save(task);
      this.tasks = this.tasks.map(t => t == task ? savedTask : t);
    } catch (ex: unknown) {
      task.error = ex as ErrorInfo<Task>;
    }
  }

  async addTask() {
    this.tasks.push(new Task());
  }

  async deleteTask(task: Task) {
    await this.taskRepo.delete(task);
    this.tasks.remove(task);
  }

  async setAll(completed: boolean) {
    await TasksController.setAll(completed);
    this.fetchTasks();
  }
}
import { Component } from '@angular/core';
import { Remult } from 'remult';
import { Task } from 'src/shared/Task';

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
  tasks: Task[] = [];
  async fetchTasks() {
    this.tasks = await this.taskRepo.find({
      limit: 20,
      orderBy: { completed: "asc"},
      where: {completed: this.hideCompleted ? false : undefined}
    });
  }
  ngOnInit() {
    this.fetchTasks();
  }

  async saveTask(task: Task) {
    const savedTask = await this.taskRepo.save(task);
    //this.tasks = this.tasks.map(t => t == task ? savedTask : t);
  }

  async addTask() {
    this.tasks.push(new Task());
  }
}
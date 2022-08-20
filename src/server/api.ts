import { remultExpress } from 'remult/remult-express';
import { AuthController } from '../shared/AuthController';
import { Task } from '../shared/Task';
import { TasksController } from '../shared/TasksController';

export const api = remultExpress({
    entities: [Task],
    controllers: [TasksController, AuthController],
    initApi: async remult => {
        const taskRepo = remult.repo(Task);
        if (await taskRepo.count() !== 0)  return;
        taskRepo.insert([
            { title: "Task a" },
            { title: "Task b", completed: true },
            { title: "Task c" },
            { title: "Task d" },
            { title: "Task e", completed: true }
        ]);
    }
});
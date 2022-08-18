import { Allow, BackendMethod, Remult } from "remult";
import { Task } from "./Task";

export class TasksController {
    @BackendMethod({ allowed: Allow.authenticated })
    static async setAll(completed: boolean, remult?: Remult) {
        const taskRepo = remult!.repo(Task);
        for (const task of await taskRepo.find()){
            await taskRepo.save({ ...task, completed });
        }
    }
}
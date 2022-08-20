import { Allow, BackendMethod, Remult } from "remult";
import { Roles } from "./roles";
import { Task } from "./Task";

export class TasksController {
    @BackendMethod({ allowed: Roles.admin })
    static async setAll(completed: boolean, remult?: Remult) {
        const taskRepo = remult!.repo(Task);
        for (const task of await taskRepo.find()){
            await taskRepo.save({ ...task, completed });
        }
    }
}
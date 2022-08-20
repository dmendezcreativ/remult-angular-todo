import {Allow, Entity, Fields } from "remult";

@Entity("tasks", {
    allowApiCrud: true
})
export class Task {
    @Fields.uuid()
    id!: string;

    @Fields.string({
        validate: task => {
            if ((task.title?.length ?? 0) < 3)
                throw "too short (min 3)";
        }
    })
    title = '';

    @Fields.boolean()
    completed = false;
}
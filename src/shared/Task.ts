import { RouterLinkWithHref } from "@angular/router";
import { Allow, Entity, Fields } from "remult";
import { Roles } from './roles';

@Entity("tasks", {
    allowApiRead: Allow.authenticated,
    allowApiUpdate: Allow.authenticated,
    allowApiInsert: Roles.admin,
    allowApiDelete: Roles.admin
})
export class Task {
    @Fields.uuid()
    id!: string;

    @Fields.string({
        validate: task => {
            if ((task.title?.length ?? 0) < 3)
                throw "too short (min 3)";
        },
        allowApiUpdate: Roles.admin
    })
    title = '';

    @Fields.boolean()
    completed = false;
}
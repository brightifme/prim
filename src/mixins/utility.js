import dayjs from "dayjs";
import {projectStatus, taskStatus, userRoles} from "@/services/utils";

export const utility_mixin = {
    data(){
        return {
            dayjs: dayjs,
            projectStatus: projectStatus,
            taskStatus: taskStatus,
        }
    },
    methods: {
        userRoles(role){
          return userRoles?.[role] ?? role
        },
        taskName(status){
            switch (status){
                case taskStatus.inProgress:
                    return 'In progress'
                case taskStatus.onHold:
                    return 'On hold'
                case taskStatus.completed:
                    return 'Completed'
                case taskStatus.abandoned:
                    return 'Abandoned'
                case taskStatus.active:
                    return 'Active'
                case taskStatus.archived:
                    return 'Archived'
            }
        }
    }
}

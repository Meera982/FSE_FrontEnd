import { User } from './User';
import { Task } from './Task';

export class Project{
    projectId : number;
    projectName : string;
    startDate : Date;
    endDate : Date;
    priority: number;
    user: User;
    managerName: string;
    status: string;
    taskCount: number;
    taskList: Task[];
}
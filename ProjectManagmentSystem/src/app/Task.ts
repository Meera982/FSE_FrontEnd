import { Project } from './Project';
import { User } from './User';
import { ParentTask } from './ParentTask';

export class Task{
	taskId:number;
	project:Project;
	parentTask:ParentTask;
	taskName:string;	
	startDate:Date;	
	endDate:Date;	
	priority:number;	
	taskStatus:string;	
    user:User;
    parentTaskName:string;
    username:string;
}
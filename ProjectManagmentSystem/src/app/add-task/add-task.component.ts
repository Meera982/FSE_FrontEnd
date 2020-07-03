import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../project.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateUserService } from '../create-user.service';
import { TaskService } from '../Task.service';
import { UserModalComponent } from '../modals/user-modal/user-modal.component';
import { ProjectModalComponent } from '../modals/project-modal/project-modal.component';
import { Project } from '../Project';
import { Task } from '../Task';
import { Options } from 'ng5-slider';
import { TaskModalComponent } from '../modals/task-modal/task-modal.component';
import { User } from '../User';
import { ParentTask } from '../ParentTask';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  submitted = false;
  registerForm: FormGroup;
  projectList: Project[];
  userList: User[];
  selectedUser = new User();
  selectedProject= new Project();
  task= new Task();
  parentTask = new ParentTask();
  value: number = 0;
  parentTaskList: ParentTask[];
  myDate = new Date();
  nextDate = new Date(this.myDate);
  dateError : any={isError:false,errorMessage:''};
  options: Options = {
    floor: 0,
    ceil: 30
  };
  submitButtonName: string;

  constructor(private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    private createUserService: CreateUserService,
    private taskService: TaskService) { }

  ngOnInit(): void {
    this.nextDate.setDate(this.myDate.getDate()+1);    
    this.submitButtonName ="Add Task";
    this.registerForm = this.formBuilder.group({
      project: ['', Validators.required] ,
      taskName: ['', Validators.required],
      parentTask: ['',Validators.required],
      username: ['',Validators.required],
      startDate: ['',Validators.required],
      endDate: ['',Validators.required]
   })
  this.projectService.listProjects().subscribe((data: any[])=>{
    console.log(data);
    this.projectList = data;
    console.log(this.projectList);
  })
  this.taskService.listParentTask().subscribe((data: any[])=>{
    console.log(data);
    this.parentTaskList = data;
    console.log(this.parentTaskList);
  })
  this.createUserService.listUsers().subscribe((data: any[])=>{
    console.log(data);
    this.userList = data;
    console.log(this.userList);
  })
  this.registerForm.get('project').disable();
  this.registerForm.get('startDate').setValue(this.myDate);
  this.registerForm.get('endDate').setValue(this.nextDate);   
  }

  compareTwoDates(){
    if(new Date(this.registerForm.controls['endDate'].value)<new Date(this.registerForm.controls['startDate'].value)){
       this.dateError={isError:true,errorMessage:'End Date cant before start date'};
       this.registerForm.disable;
    }
 }

  openProjectModal(){
    const modalRef = this.modalService.open(ProjectModalComponent,
      {
        scrollable: true,
        windowClass: 'select project',
       });  
  
    modalRef.componentInstance.projectList = this.projectList;
    modalRef.result.then((result) => {
      console.log('-->'+result);
      this.selectedProject.endDate = result.endDate;
      this.selectedProject.managerName = result.managerName;
      this.selectedProject.priority = result.priority;
      this.selectedProject.projectId = result.projectId;
      this.selectedProject.projectName = result.projectName;
      this.selectedProject.startDate = result.startDate;
      this.selectedProject.status = result.status;
      this.selectedProject.taskCount = result.taskCount;
      this.selectedProject.user = result.user;
      this.selectedProject.taskList = result.taskList;
      this.registerForm.get('project').setValue(result.projectName); 
      this.task.project  = this.selectedProject;
      }, (reason) => {
    });
  }

  openParentTaskModal(){
    const modalRef = this.modalService.open(TaskModalComponent,
      {
        scrollable: true,
        windowClass: 'select Parent Task',
       });  
  
    modalRef.componentInstance.taskList = this.parentTaskList;
    modalRef.result.then((result) => {
      console.log('-->'+result);
      this.parentTask.parentTaskId = result.parentTaskId;
      this.parentTask.parentTaskName = result.parentTaskName;
      this.registerForm.get('parentTask').setValue(result.parentTaskName);  
      this.task.parentTask = this.parentTask;       
    }, (reason) => {
    });
  }

  onCheckboxChange(e) {
    this.registerForm.get('endDate').disable();
    this.registerForm.get('startDate').disable(); 
    this.registerForm.get('parentTask').disable();    
    this.registerForm.get('username').disable();    
  }

  isEnabled(){
    return (this.task.endDate)?true:false;
  }

  openUserModal() {
    const modalRef = this.modalService.open(UserModalComponent,
      {
        scrollable: true,
        windowClass: 'select manager for the task',
       });  
  
    modalRef.componentInstance.userList = this.userList;
    modalRef.result.then((result) => {
      console.log('-->'+result);
      this.selectedUser.firstName = result.firstName;
      this.selectedUser.lastName = result.lastName;
      this.selectedUser.empId = result.empId;
      this.selectedUser.userId = result.userId;
      this.registerForm.get('username').setValue(result.firstName+" "+result.lastName); 
      this.task.user =  this.selectedUser;
    }, (reason) => {
    });
  }
  onSubmit() {
    this.submitted = true;
    this.task.priority = this.value;
    // stop the process here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }   

    if(this.submitButtonName === 'Update'){
      this.taskService.updateTask(this.task).subscribe((data: any[])=>{
        console.log(data);        
      })
    }else{
      this.taskService.addTask(this.task).subscribe((data: any[])=>{
        console.log(data);        
      })
    }
  }
  

}

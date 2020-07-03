import { Component, OnInit } from '@angular/core';
import { Options } from 'ng5-slider';
import { Project } from '../Project';
import { User } from '../User';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../project.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserModalComponent } from '../modals/user-modal/user-modal.component';
import { CreateUserService } from '../create-user.service';


@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  filterData: string;
  value: number = 0;
  submitButtonName: string = "Add";
  project = new Project();
  projectList: Project[];
  propertyName: string;
  myDate = new Date();
  nextDate = new Date(this.myDate);
  userList: User[];
  managerUser = new User();
  dateError : any={isError:false,errorMessage:''};
  options: Options = {
    floor: 0,
    ceil: 30
  };

  constructor( private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    private createUserService: CreateUserService) { }

  ngOnInit(): void {
    this.nextDate.setDate(this.myDate.getDate()+1);
    this.submitButtonName = "Add";
    this.registerForm = this.formBuilder.group({
      projectName: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      managerName: ['', Validators.required]      
  }
  );
  this.createUserService.listUsers().subscribe((data: any[])=>{
    console.log(data);
    this.userList = data;
    console.log(this.userList);
  })
  this.projectService.listProjects().subscribe((data: any[])=>{
    console.log(data);
    this.projectList = data;
    console.log(this.projectList);
  })
    this.registerForm.get('endDate').disable();
    this.registerForm.get('startDate').disable();
    this.registerForm.get('managerName').disable();
  }
  

  onSubmit() {
    this.submitted = true;
    this.project.priority = this.value;
    // stop the process here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    

    if(this.submitButtonName === 'Update'){
      alert('Going to call update');
      this.projectService.updateProject(this.project).subscribe((data: any[])=>{
        console.log(data);
        this.projectList = data;
        console.log(this.projectList);
      })
    }else{
      this.projectService.addProject(this.project).subscribe((data: any[])=>{
        console.log(data);
        this.projectList = data;
        console.log(this.projectList);
      })
    }
  }
  onCheckboxChange(e) {
    this.registerForm.get('endDate').enable();
    this.registerForm.get('startDate').enable();
    this.registerForm.get('startDate').setValue(this.myDate);
    this.registerForm.get('endDate').setValue(this.nextDate);    
  }

  compareTwoDates(){
    if(new Date(this.registerForm.controls['endDate'].value)<new Date(this.registerForm.controls['startDate'].value)){
       this.dateError={isError:true,errorMessage:'End Date cant before start date'};
       this.registerForm.disable;
    }
 }

 openUserModal() {
  const modalRef = this.modalService.open(UserModalComponent,
    {
      scrollable: true,
      windowClass: 'select manager for the project',
     });  

  modalRef.componentInstance.userList = this.userList;
  modalRef.result.then((result) => {
    console.log('-->'+result);
    this.managerUser.firstName = result.firstName;
    this.managerUser.lastName = result.lastName;
    this.managerUser.empId = result.empId;
    this.managerUser.userId = result.userId;
    this.registerForm.get('managerName').setValue(result.firstName+" "+result.lastName); 
    this.project.user =  this.managerUser;
  }, (reason) => {
  });
}

sortByCompleted(property:string){
  return this.projectList.filter((item1)=> {
    return (item1[property]== 'Yes') ? 1 : -1;});
}

sortByPriority(property:string){
  return this.projectList.sort((item1,item2)=> {
    return (item1[property] > item2[property]) ? 1 : -1;});
}

sortByDate(property:string){
  return this.projectList.sort((item1,item2)=> {
    return (new Date(item1[property]) > new Date(item2[property])) ? 1 : -1;});
}

editProject(projectItem:Project){
  
  this.project.projectName = projectItem.projectName;
  this.project.startDate = projectItem.startDate;
  this.project.endDate = projectItem.endDate;
  this.project.managerName = projectItem.managerName;
  this.project.priority = projectItem.priority;
  this.project.projectId = projectItem.projectId;
  this.project.status = projectItem.status;
  this.project.user = projectItem.user;

  if(projectItem.endDate){
    this.registerForm.get('endDate').enable();
    this.registerForm.get('startDate').enable();
    this.registerForm.get('startDate').setValue(new Date(projectItem.startDate)); 
    this.registerForm.get('endDate').setValue(new Date(projectItem.endDate)); 
  }  
  this.value = projectItem.priority;
  this.registerForm.get('managerName').setValue(projectItem.managerName); 
  this.submitButtonName = 'Update';
}

deleteProject(projectItem:Project){
  this.projectService.deleteProject(projectItem).subscribe((data: any[])=>{
    console.log(data);
    this.projectList = data;
    console.log(this.projectList);
  });
}
isEnabled(){
  return (this.project.endDate)?true:false;
}
    
}
  



import { Component,ComponentFactoryResolver,Injector, OnInit }from '@angular/core';
import { Project } from '../Project';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../project.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectModalComponent } from '../modals/project-modal/project-modal.component';
import { Task } from '../Task';
import { TaskService } from '../Task.service';
import { UpdateTaskWindowComponent } from '../update-task-window/update-task-window.component';


@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {

  taskList: Task[];
  registerForm: FormGroup;
  selectedProject = new Project();
  projectList: Project[];
  OpenWindow : any

  constructor( private modalService: NgbModal,
    private projectService: ProjectService,
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private resolver: ComponentFactoryResolver,
    private injector: Injector) { }

  ngOnInit(): void {
  this.projectService.listProjects().subscribe((data: any[])=>{
    console.log(data);
    this.projectList = data;
    console.log(this.projectList);
  })
  this.registerForm = this.formBuilder.group({
    project: ['']})    
  }
  

  

sortByCompleted(property:string){
  return this.taskList.filter((item1)=> {
    return (item1[property]== 'Yes') ? 1 : -1;});
}

sortByPriority(property:string){
  return this.taskList.sort((item1,item2)=> {
    return (item1[property] > item2[property]) ? 1 : -1;});
}

sortByDate(property:string){
  return this.taskList.sort((item1,item2)=> {
    return (new Date(item1[property]) > new Date(item2[property])) ? 1 : -1;});
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
    this.taskList = result.taskList;
    this.registerForm.get('project').setValue(result.projectName); 
    }, (reason) => {
  });
}

endTask(taskItem:Task){
  this.taskService.endTask(taskItem).subscribe((data: any[])=>{
    console.log(data);    
  })
}

 updateTask(taskItem:Task){
  const componentFactory = this.resolver.resolveComponentFactory(UpdateTaskWindowComponent);
  let componentRef  = componentFactory.create(this.injector);
  this.OpenWindow = window.open('', 'childwindow', 'width=400,height=400,left=150,top=200');
  this.OpenWindow.document.body.innerHTML = "";
  this.OpenWindow.document.body.appendChild(componentRef.location.nativeElement);
  this.OpenWindow.document.querySelectorAll('link, style').forEach(htmlElement => {
    this.OpenWindow.document.head.appendChild(htmlElement.cloneNode(true));
  });

 }
 
close(){
  this.OpenWindow.close()
}

}




import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Project } from 'src/app/Project';

@Component({
  selector: 'app-project-modal',
  templateUrl: './project-modal.component.html',
  styleUrls: ['./project-modal.component.css']
})
export class ProjectModalComponent implements OnInit {
  @Input() projectList: Project[]; 
  project = new Project();
  filterData: string;

  constructor(public activeModal: NgbActiveModal) { }


  ngOnInit(): void {
  }

  closeModal(selectedItem) {
    this.activeModal.close(this.project);
  }

  selectItem(selectedProject): void{
    console.log(selectedProject);
    this.project.endDate = selectedProject.endDate;
    this.project.managerName = selectedProject.managerName;
    this.project.priority = selectedProject.priority;
    this.project.projectId = selectedProject.projectId;
    this.project.projectName = selectedProject.projectName;
    this.project.startDate = selectedProject.startDate;
    this.project.status = selectedProject.status;
    this.project.taskCount = selectedProject.taskCount;
    this.project.user = selectedProject.user;
    this.project.taskList = selectedProject.taskList;
  }

}

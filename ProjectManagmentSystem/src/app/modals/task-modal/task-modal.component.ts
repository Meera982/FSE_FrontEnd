import { Component, OnInit, Input } from '@angular/core';
import { Task } from 'src/app/Task';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ParentTask } from 'src/app/ParentTask';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.css']
})
export class TaskModalComponent implements OnInit {

  @Input() taskList: ParentTask[]; 
  task = new ParentTask();
  filterData: string;

  constructor(public activeModal: NgbActiveModal) { }


  ngOnInit(): void {
  }

  closeModal(selectedItem) {
    this.activeModal.close(this.task);
  }

  selectItem(selectedParentTask): void{
    console.log(selectedParentTask);
    this.task.parentTaskId = selectedParentTask.parentTaskId;
    this.task.parentTaskName = selectedParentTask.parentTaskName;
  }
} 

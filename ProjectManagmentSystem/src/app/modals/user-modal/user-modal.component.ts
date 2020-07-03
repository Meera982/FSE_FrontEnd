import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/User';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.css']
})
export class UserModalComponent implements OnInit {

  @Input() userList: User[]; 
  user = new User();

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    console.log('in');
    console.log(this.userList);    
  }

  closeModal(selectedItem) {
    this.activeModal.close(this.user);
  }

  selectItem(selectedUser): void{
    console.log(selectedUser);
    this.user.firstName = selectedUser.firstName;
    this.user.lastName = selectedUser.lastName;
    this.user.empId = selectedUser.empId;
    this.user.userId = selectedUser.userId;
  }


}

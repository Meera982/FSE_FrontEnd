import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../User';
import { CreateUserService } from '../create-user.service';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  user = new User();
  userList: User[];
  propertyName: string;
  filterData: string;
  submitButtonName: string;
  
  constructor(
    private formBuilder: FormBuilder,
    private userService: CreateUserService) { }

  ngOnInit(): void {
    this.submitButtonName = 'Add';
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      empID: ['', [Validators.required]]
  });

  this.userService.listUsers().subscribe((data: any[])=>{
    console.log(data);
    this.userList = data;
    console.log(this.userList);
  })
  }

  onSubmit() {
    this.submitted = true;
 
    // stop the process here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }
    
    if(this.submitButtonName === 'Update'){
      alert('Going to call update');
      this.userService.updateUser(this.user).subscribe((data: any[])=>{
        console.log(data);
        this.userList = data;
        console.log(this.userList);
      })
    }else{
      this.userService.addUser(this.user).subscribe((data: any[])=>{
        console.log(data);
        this.userList = data;
        console.log(this.userList);
      })
    }
    
}

sortByProperty(property:string){
  return this.userList.sort((item1,item2)=> {
    return (item1[property].toLowerCase() > item2[property].toLowerCase()) ? 1 : -1;});
}

sortByID(property:string){
  return this.userList.sort((item1,item2)=> {
    return (item1[property] > item2[property]) ? 1 : -1;});
}

  deleteUser(userItem:User){
    this.userService.deleteUser(userItem).subscribe((data: any[])=>{
      console.log(data);
      this.userList = data;
      console.log(this.userList);
    });
  }

  editUser(userItem:User){
    this.user = userItem;
    this.submitButtonName = 'Update';
  }




}

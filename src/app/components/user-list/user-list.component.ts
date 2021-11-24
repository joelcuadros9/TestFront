import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  userForm: FormGroup;

  displayedColumns: string[] = ['id', 'firstname', 'lastname', 'email', 'username', 'actions'];
  dataSource: any;

  constructor(private userService: UserService,
              private formBuilder: FormBuilder) {
    this.userForm = this.formBuilder.group({
      id: [null],
      firstname: [null],
      lastname: [null],
      email: [null],
      username: [null]
    });
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe(
      user => {
        console.log(user);
        this.dataSource = user;
      }
    );
  }

  addOrUpdateUser() {
    if (this.userForm.get('id')?.value == null){
      this.userService.addUser(this.userForm.value).subscribe(
        user => {
          console.log(user);
          this.clearForm();
          this.getAllUsers();
        }
      );
    }else {
      this.userService.updateUser(this.userForm.value).subscribe(
        user => {
          console.log(user);
          this.clearForm();
          this.getAllUsers();
        }
      );
    }

  }

  deleteUser(id: number){
    this.userService.deleteUser(id).subscribe(
      resp => {
        this.getAllUsers();
      }
    )
  }

  setUserForm(data: any) {
    this.userForm.get('id')?.setValue(data.id);
    this.userForm.get('firstname')?.setValue(data.firstname);
    this.userForm.get('lastname')?.setValue(data.lastname);
    this.userForm.get('email')?.setValue(data.email);
    this.userForm.get('username')?.setValue(data.username);
  }

  clearForm() {
    this.userForm.reset();
  }

}

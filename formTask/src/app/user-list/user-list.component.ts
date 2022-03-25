import { Component, OnInit } from '@angular/core';
import { FormService } from '../formService.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: any;
  constructor(private formService: FormService) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.formService.getUsers().subscribe((data: any[]) => {
      this.users = data;
      console.log('in getAllUsers ' + this.users);
    });
  }
}

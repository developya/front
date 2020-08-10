import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../models/user';
import { UserService } from './user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();


   listUsers:  User[] = [];
  constructor(private userService : UserService) {

   

   }

  ngOnInit(): void {

    this.userService.getUsers()
    .subscribe(
      data =>{
        this.listUsers=data;
        this.dtTrigger.next();

        console.log(this.listUsers);

      },
      error => console.log(error)
      );
  }

}

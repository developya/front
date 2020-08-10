import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css']
})
export class LeftMenuComponent implements OnInit {


  role;
 
   constructor(private router: Router, private loginService : LoginService) { 
     
 this.loginService.getProfile()
 .subscribe(
   data =>{ this.role=data["profile"].role},
   error => this.router.navigate(["/login"])
   );
   
 
   }

  ngOnInit(): void {
  }

}

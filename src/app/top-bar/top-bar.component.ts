import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

 username;
 role;

  constructor(private router: Router, private loginService : LoginService) { 
    
this.loginService.getProfile()
.subscribe(
  data =>{this.username=data["profile"].first_name+" "+data["profile"].last_name;
          this.role=data["profile"].role},
  error => this.router.navigate(["/login"])
  );
  

  }

  ngOnInit(): void {
  }



logout(){
  localStorage.removeItem('token');
  this.router.navigate(['/login']);
}





}
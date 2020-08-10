  import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

   login_error_meesage: String;
   login_success_meesage: String;

  loginForm= new FormGroup(
  {
    email: new FormControl('',[
      Validators.required,
      Validators.minLength(3)
    ]),
    password: new FormControl('',[
      Validators.required
    ])
  });



  constructor(private fb: FormBuilder, private loginService : LoginService,private router: Router) { }

  
  ngOnInit() {

    }

  onSubmit(form: FormGroup) {

this.loginService.login(form.value)
.subscribe(
  data => {


    switch (data['status']) {
      case 300:
        this.login_error_meesage=data['message'];
        console.log( this.login_error_meesage)
        
        break;

      case 301:
        this.login_error_meesage=data['message'];
        console.log(this.login_error_meesage)

        break;

      case 200:
        this.login_error_meesage="";
        localStorage.setItem('token', data["token"]);
        console.log(data["status"])
        this.login_success_meesage="Connexion en cours ...";
   
        setTimeout(() => {
          this.router.navigate(['/']);
      }, 1500);  //2s
        break;  

    }



   
  },
  error => {
    console.log(error)

  }
)

  }

}

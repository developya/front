import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }


  login(body:any){

   return this.http.post('http://localhost:3000/api/login',body)
  }

  loggedIn(){
    return !!localStorage.getItem("token");
  }


  getProfile(){

    return this.http.get<User[]>('http://localhost:3000/api/getProfile',{
      observe: 'body',
      params : new HttpParams().append('token',localStorage.getItem('token'))
      
      
  });
   }

}



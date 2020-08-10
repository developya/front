import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  
  getUsers(){

    return this.http.get<User[]>('http://localhost:3000/api/allUsers')
   }

  getAdmins(){

    return this.http.get<User[]>('http://localhost:3000/api/allAdmins')
   }

   alloperateur(){

    return this.http.get<User[]>('http://localhost:3000/api/alloperateur/')
   }

   getUser(id){
    return this.http.get<User>('http://localhost:3000/api/find/'+id)

   }
 
}
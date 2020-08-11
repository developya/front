import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CallHistoryService {

  constructor(private http: HttpClient) { }


  addCall(body:any){

    return this.http.post('http://localhost:3000/api/newCall',body)
   }
}

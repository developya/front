import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class MissionsService {



  constructor(private http: HttpClient) { }

  
  getaffectedorders(user_id){


    return this.http.get<Order[]>('http://localhost:3000/api/getallaffectedorders/'+user_id)
   }

   getOrderById(order_id){

    return this.http.get<Order>('http://localhost:3000/api/findOrder/'+order_id)
   }

   affectOrderToOperateur(order_id,user_id){


    return this.http.put<Order>('http://localhost:3000/api/affect_to_operateur/'+order_id,{
      
        "user_id": user_id

   }   )  

}

getMotifRefus(){


  return this.http.get<[]>('http://localhost:3000/api/getAllmotifRefus/')
 }



}

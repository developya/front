
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Order } from '../models/order';
@Injectable({
  providedIn: 'root'
})
export class OrderService {


  constructor(private http: HttpClient) { }

  
  getall(){

    return this.http.get<Order[]>('http://localhost:3000/api/getall')
   }

   getOrderById(order_id){

    return this.http.get<Order>('http://localhost:3000/api/findOrder/'+order_id)
   }

   affectOrderToAdmin(order_id,user_id){


    return this.http.put<Order>('http://localhost:3000/api/affect_to_admin/'+order_id,{
      
        "user_id": user_id

   }   )  

}
}
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { OrderService } from './order.service';
import { Order } from '../models/order';
import { Subject } from 'rxjs';
import {NgForm} from '@angular/forms';
import { UserService } from '../users/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
 
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  listAdmins: User[]=[];
  selected_Order_Id;
  selected_Order:Order;
  affected_user_name


   allorders:  Order[] = [];

  constructor(private orderService : OrderService,private userService: UserService) {

   
   
   }

  ngOnInit(): void {

    this.userService.getAdmins() 
    .subscribe(
      data =>{
        this.listAdmins=data;
        

        console.log(this.listAdmins);

      },
      error => console.log(error)
      );

    this.orderService.getall()
    .subscribe(
      data =>{
        this.allorders=data;
        this.dtTrigger.next();
     
        console.log(this.allorders);

      },
      error => console.log(error)
      );

  }
  
   affect_To_Admin(myForm: NgForm,selected_cmd_id) {
     console.log(myForm);
   let user_id=myForm.value["user_id"];
   let order_id=selected_cmd_id;

   this.orderService.affectOrderToAdmin(order_id,user_id).subscribe(data => {})

   let index = this.allorders.indexOf(this.selected_Order);
   let order=this.selected_Order;
   order.affected_to_user1_id = user_id;
   

   let user = this.listAdmins.find(i => i.id == user_id);
   order['AdminUser']=user
   this.allorders[index] = order;


  }
 

  getOrderId(id,order:Order){
    this.selected_Order_Id=id;
    this.selected_Order=order;

  }


}

import { Component, OnInit } from '@angular/core';
import { Order } from '../models/order';
import { OrderService } from '../orders/order.service';
import { Subject } from 'rxjs';
import { User } from '../models/user';
import { NgForm } from '@angular/forms';
import { UserService } from '../users/user.service';
import { LoginService } from '../login/login.service';
import { MissionsService } from './missions.service';

@Component({
  selector: 'app-missions',
  templateUrl: './missions.component.html',
  styleUrls: ['./missions.component.css']
})
export class MissionsComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  listOperauers: User[]=[];
  selected_Order_Id;
  selected_Order:Order;
  affected_user_name;
  connected_user_id;
  user_role;

   allorders:  Order[] = [];

  constructor(private missionsService : MissionsService,private userService: UserService,private loginService: LoginService) {

   
   
   }

  ngOnInit(): void {

    this.loginService.getProfile()
    .subscribe(
      data =>{
        
        this.connected_user_id=data["profile"].id;
        this.user_role=data["profile"].role;

      this.missionsService.getaffectedorders(this.connected_user_id)
      .subscribe(
        data =>{
          this.allorders=data;
          this.dtTrigger.next();
       
          console.log(this.allorders);
  
        },
        error => console.log(error)
        );
      },
      error => {}
      );

      this.userService.alloperateur() 
      .subscribe(
        data =>{
          this.listOperauers=data;
          
  
          console.log(this.listOperauers);
  
        },
        error => console.log(error)
        );

  }
  
   
  affect_To_Operateur(myForm: NgForm,selected_cmd_id) {
    console.log(myForm);
  let user_id=myForm.value["user_id"];
  let order_id=selected_cmd_id;

  this.missionsService.affectOrderToOperateur(order_id,user_id).subscribe(data => {})

  let index = this.allorders.indexOf(this.selected_Order);
  let order=this.selected_Order;
  order.affected_to_user1_id = user_id;
  

  let user = this.listOperauers.find(i => i.id == user_id);
  order['OperateurUser']=user
  this.allorders[index] = order;


 }
  getOrderId(id,order:Order){
    this.selected_Order_Id=id;
    this.selected_Order=order;

  }


}

import { Component, OnInit } from '@angular/core';
import { OrderService } from '../orders/order.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Order } from '../models/order';
import { Client } from '../models/client';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  constructor(private orderService : OrderService  ,  private route: ActivatedRoute,private router: Router) {}

  order_id;
  order:Order;
  ngOnInit() {
    
    // (+) converts string 'id' to a number
    this.order_id = this.route.snapshot.params.id;

    this.orderService.getOrderById(this.order_id)
    .subscribe(
      data =>{
        this.order=data
     
        console.log(data);

      },
      error => console.log(error)
      );

  }

}

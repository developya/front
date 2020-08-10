import { Component, OnInit } from '@angular/core';
import { OrderService } from '../orders/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from '../models/order';

@Component({
  selector: 'app-mission-details',
  templateUrl: './mission-details.component.html',
  styleUrls: ['./mission-details.component.css']
})
export class MissionDetailsComponent implements OnInit {

  order_id;
  order:Order;
  constructor(private orderService : OrderService  ,  private route: ActivatedRoute,private router: Router) {}

  ngOnInit(): void {
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

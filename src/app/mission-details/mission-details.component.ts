import { Component, OnInit } from '@angular/core';
import { OrderService } from '../orders/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from '../models/order';
import { MissionsService } from '../missions/missions.service';
import { LoginService } from '../login/login.service';
import { NgForm } from '@angular/forms';
import { CallHistoryService } from '../call-history/call-history.service';

@Component({
  selector: 'app-mission-details',
  templateUrl: './mission-details.component.html',
  styleUrls: ['./mission-details.component.css']
})
export class MissionDetailsComponent implements OnInit {

  order_id;
  order:Order;
  showFormRdvValide:boolean;
  showFormRappel:boolean;
  showFormRefus:boolean;
  motifRefusList=[]
  constructor(private orderService : OrderService  ,
      private route: ActivatedRoute,
      private router: Router,
      private missionsService: MissionsService,
      private loginService: LoginService,
      private callhistory: CallHistoryService
    ) {}

  ngOnInit(): void {

        this.showFormRefus=false;
        this.showFormRappel=false;
        this.showFormRdvValide=false;
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


          this.missionsService.getMotifRefus() 
          .subscribe(
            data =>{
              this.motifRefusList=data;
              
      
              console.log(this.motifRefusList);
      
            },
            error => console.log(error)
            );
  }


  showForm(statut:String){
  switch (statut) {

    case 'valide':
        this.showFormRefus=false;
        this.showFormRappel=false;
        this.showFormRdvValide=true;
      break;
    case 'rappel':
        this.showFormRefus=false;
        this.showFormRappel=true;
        this.showFormRdvValide=false;
      break;  
    case 'refus':
        this.showFormRefus=true;
        this.showFormRappel=false;
        this.showFormRdvValide=false;
      break;  

  }
  }

  hideForm(){
    this.showFormRefus=false;
    this.showFormRappel=false;
    this.showFormRdvValide=false;
  }

  call_refus(myForm: NgForm,orderid) {
    
    let user_id;
    let status="refus";
    let motif_call=myForm.value["motif_refus"];
    let order_id=orderid;

    this.callhistory.addCall()
    .subscribe(
      data =>{   
        user_id=data["profile"].id;   
      },
      error => {}
      );


      this.ca.login(form.value)
      
      .subscribe(
          data => {
            console.log(data)

          },
          error => {
            console.log(error)

          }
        )



    console.log(myForm)

  }
}

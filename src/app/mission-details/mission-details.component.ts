import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from '../orders/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from '../models/order';
import { MissionsService } from '../missions/missions.service';
import { LoginService } from '../login/login.service';
import { NgForm } from '@angular/forms';
import { CallHistoryService } from '../call-history/call-history.service';
import { BoundTextAst } from '@angular/compiler';
import {DatePickerComponent} from 'ng2-date-picker';  

@Component({
  selector: 'app-mission-details',
  templateUrl: './mission-details.component.html',
  styleUrls: ['./mission-details.component.css']
})
export class MissionDetailsComponent implements OnInit {
  @ViewChild('dayPicker') datePicker: DatePickerComponent;  
  open() { this.datePicker.api.open(); }  
  close() { this.datePicker.api.close(); }

  order_id;
  user_id;
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


        this.loginService.getProfile().subscribe(
          data =>{this.user_id=data["profile"].id},
          error => {}
          );



        this.orderService.getOrderById(this.order_id)
        .subscribe(
          data =>{
            this.order=data
         
            console.log(data);
    
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
      this.missionsService.getMotifRefus('a rappeler') 
          .subscribe(
            data =>{
              this.motifRefusList=data;
              console.log(this.motifRefusList);
      
            },
            error => console.log(error)
            );
        this.showFormRefus=false;
        this.showFormRappel=true;
        this.showFormRdvValide=false;
      break;  
    case 'refus':
        
        this.missionsService.getMotifRefus('refus') 
          .subscribe(
            data =>{
              this.motifRefusList=data;
              console.log(this.motifRefusList);
      
            },
            error => console.log(error)
            );


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

  add_call(myForm: NgForm,orderid,status) {
    

    switch (status) {
      case "refus":
        
       
    let body_refus = {
      'order_id': orderid,
      'user_id': this.user_id,
      'statut': status,
      'motif_call': myForm.value["motif_refus"]

    }
    this.callhistory.addCall(body_refus)
    .subscribe(
      data =>{   
       // console.log(data)
      },
      error => {console.log(error)}
      );

        break;
 case "a rappeler":


  let body_a_rappeler = {
    'order_id': orderid,
    'user_id': this.user_id,
    'statut': status,
    'motif_call': myForm.value["motif_refus"]

  }
  this.callhistory.addCall(body_a_rappeler)
  .subscribe(
    data =>{   
     // console.log(data)
    },
    error => {console.log(error)}
    );
       break;
    }


  }



}

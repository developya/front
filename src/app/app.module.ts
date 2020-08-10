import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { LeftMenuComponent } from './left-menu/left-menu.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule,Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginService } from './login/login.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './auth.guard';
import { UsersComponent } from './users/users.component';
import { OrdersComponent } from './orders/orders.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { MissionsComponent } from './missions/missions.component';
import { MissionDetailsComponent } from './mission-details/mission-details.component';
import { CallHistoryComponent } from './call-history/call-history.component';




const routes : Routes=[
  {
    path:"",
    component:DashboardComponent ,
    canActivate:[AuthGuard],
    children: [
      {path:"", redirectTo: "welcome",pathMatch:'full'},
      {path:"welcome", component:HomeComponent},
      {path:"users", component:UsersComponent},
      {path:"orders", component:OrdersComponent},
      {path:"orders/:id", component:OrderDetailsComponent},
      {path:"missions", component:MissionsComponent},
      {path:"missions/:id", component:MissionDetailsComponent}
    ]
  },
  {
    path:"login",
    component:LoginComponent 
  },
  {
    path:"**",
    component:LoginComponent 
  }
]

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    LeftMenuComponent,
    LoginComponent,
    DashboardComponent,
    HomeComponent,
    UsersComponent,
    OrdersComponent,
    OrderDetailsComponent,
    MissionsComponent,
    MissionDetailsComponent,
    CallHistoryComponent,
    
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    HttpClientModule,
    DataTablesModule,
    FormsModule 
  ],
  providers: [LoginService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

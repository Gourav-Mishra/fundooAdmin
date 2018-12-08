import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginAdminComponent } from './component/login-admin/login-admin.component';
import { AdminDashboardComponent } from './component/admin-dashboard/admin-dashboard.component';
import { AdminApprovalComponent } from './component/admin-approval/admin-approval.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginAdminComponent,
    AdminDashboardComponent,
    AdminApprovalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

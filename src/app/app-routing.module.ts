import { NgModule } from '@angular/core';
import { RouterModule,Routes } from "@angular/router";

import { LoginAdminComponent } from "./component/login-admin/login-admin.component";
import { AdminDashboardComponent } from "./component/admin-dashboard/admin-dashboard.component";
import { AuthguardGuard } from './authguard.guard';

const routes:Routes=[

  { path: '',component:AdminDashboardComponent, pathMatch: 'full', canActivate:[AuthguardGuard] },
  {path: 'login-admin', component:LoginAdminComponent},
  {path : 'admin-dashboard', component:AdminDashboardComponent,canActivate:[AuthguardGuard]}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

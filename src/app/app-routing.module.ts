import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './Core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo:'/auth/login',
    pathMatch:'full'
  },
  {
    path:'auth',
    loadChildren: ()=> import("./Modules/auth/auth.module").then(m=>m.AuthModule)
  },
  {
    path:'dashboard',
    loadChildren:()=> import("./Modules/dashboard/dashboard.module").then(m=>m.DashboardModule),
    canActivate:[authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Core/service/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  allUsers:any;

  constructor(private _AuthService:AuthService,private _toastr:ToastrService
  ){}

  ngOnInit(): void {
    this.getUser();
  }
  getUser(){
    this._AuthService.getUser().subscribe(
      (response:any)=>{
        this.allUsers = response.item.users;
      },
    (error:any)=>{
      // this._toastr.error(error.error.message)
    })
  }
  signout(){
    this._AuthService.SignOut();
  }
}

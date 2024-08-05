import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient,private _toastr:ToastrService,private _router:Router) { }

  private baseApi = 'https://localhost:7259/api/';

  login(data:any){
    return this._http.post(this.baseApi+"Customer/Login",data);
  }
  SignUP(data:any){
    return this._http.post(this.baseApi+"Customer/SignUp",data);
  }

  setToken(token:any){
    localStorage.setItem('token',token);
  }
  isLoggedIn():boolean{
    return !!localStorage.getItem('token');
  }
  getToken(){
    return localStorage.getItem('token');
  }
  SignOut(){
    localStorage.clear();
    this._toastr.info('User logged out successfully');
    this._router.navigateByUrl("/auth/login");
  }

  getUser() {
    return this._http.get(this.baseApi+"User/GetAllUsers");
  }
}

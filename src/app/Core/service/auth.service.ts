import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { empty } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient) { }

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
    localStorage.getItem('token');
  }
}

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private _router:Router,
    private _authService:AuthService,private _toastr:ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this._authService.getToken();

    if(token){
      request = request.clone({
        setHeaders: {Authorization:`Bearer ${token}`},
      })
    }
    return next.handle(request).pipe(
      catchError((error:any)=>{
        if(error instanceof HttpErrorResponse){
          if(error.status === 401){
            this._toastr.warning('Token is expired, Login again');
            this._router.navigateByUrl("/auth/login")
          }
        }
        return throwError(()=>new Error("Some other error"))
      })
    );
  }
}

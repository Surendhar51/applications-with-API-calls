import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Core/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  loginForm:FormGroup

  constructor(
    private _fb:FormBuilder,
    private _AuthService: AuthService,
    private _toastr: ToastrService,
    private _router:Router
  ){  }


  ngOnInit(): void {
    this.loginForm = this._fb.group({
      Email: ['',[Validators.required,Validators.email]],
      Password: ['',[Validators.required,Validators.minLength(8)]]
    })
  }

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }
  
  Login(){
    this._AuthService.login(this.loginForm.value).subscribe(
      (response:any)=>{
        this._AuthService.setToken(response.item.customerDetails.token);
        this._toastr.success('Successfully logged');
        this._router.navigateByUrl("/dashboard");
        this.loginForm.reset();
      },
      (error:any)=>{
        this._toastr.error(error.error.message);
      })
  }
}

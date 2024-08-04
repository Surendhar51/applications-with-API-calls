import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Core/service/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit{


  public signupForm:FormGroup;

  constructor(private _fb:FormBuilder, private _authService:AuthService, private _router:Router,private _toastr:ToastrService){  }


  ngOnInit(): void {
    this.signupForm = this._fb.group({
      FirstName: ["",Validators.required],
      LastName: ["",Validators.required],
      Email: ["",[Validators.required,Validators.email]],
      Role: [""],
      Password: ["",[Validators.required,Validators.minLength(8)]]
    })
  }

  get f(){
    return this.signupForm.controls
  }

  Signup(){
    this._authService.SignUP(this.signupForm.value).subscribe(
    (response)=>{
      this._toastr.success('Registered successfully');
      this._router.navigateByUrl("/auth/login");
    },
    (error:any)=>{
      this._toastr.error(error.error.message);
    })
  }
}

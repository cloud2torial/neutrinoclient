import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder, Validators} from '@angular/forms';
import {PasswordValidation} from './password_match';
import {Router} from '@angular/router';
import {AuthService} from '../../service/auth.service';
import {AbstractControl} from '@angular/forms'

@Component({
  selector: 'neutrino-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm:FormGroup;
  emailPattern:string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  usernamePattern:string = "^[a-z0-9_-]+$";
  passwordPattern:string = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,20}$";
  disable:boolean = false;
  
  constructor(private fb:FormBuilder,private router:Router,private auth:AuthService) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      'username':['',[Validators.required,Validators.minLength(3),Validators.maxLength(14),Validators.pattern(this.usernamePattern)]],
      'email':['',[Validators.required,Validators.pattern(this.emailPattern)]],
      'password':['',[Validators.required,Validators.minLength(6),Validators.maxLength(20),Validators.pattern(this.passwordPattern)]],
      'confirmpassword':['',Validators.required]
    }, {
      validator: PasswordValidation.MatchPassword
    })
  }


  //signup
  signup(val){
    console.log(val)
    this.auth.signup(val).subscribe((data)=>{
      console.log(data)
      this.auth.openSnackBar(data['message'],'success');
    this.router.navigate(['/auth/login']);
    },error=>{
      console.log(error)
      if(error.status == 422){
        this.auth.openSnackBar(error.error.messages[0],'error')
      }
      else{
        this.auth.openSnackBar(error.message,'error')
      }
    })
  }

  //check email exists
   emailUnique(){
    let email = this.signupForm.get('email').value
     this.auth.emailExists(email).subscribe((data)=>{
       console.log(data)
       if(data['message']==true){
        this.signupForm.get('email').setErrors( {MatchEmail: true} )
       }

     })
   }
   clearError(){
    this.signupForm.get('email').setErrors(null);
   }
  
  

}

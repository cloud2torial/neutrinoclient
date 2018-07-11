import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import {AuthService} from '../../service/auth.service';
import {Router} from '@angular/router'

@Component({
  selector: 'neutrino-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  emailPattern:string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  constructor(private fb:FormBuilder,private auth:AuthService,private router:Router) { }
  loginForm:FormGroup;

  ngOnInit() {
    this.loginForm = this.fb.group({
      'email':['',[Validators.required,Validators.pattern(this.emailPattern)]],
      'password':['',Validators.required]
    })
  }

  //login
  login(val){
    console.log(val)
    this.auth.login(val).subscribe((data)=>{
      console.log(data)
      this.auth.openSnackBar(data['message'],'success');
    this.router.navigate(['/']);
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

}

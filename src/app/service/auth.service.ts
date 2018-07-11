import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router'
import {MatSnackBar,MatSnackBarConfig,MatSnackBarVerticalPosition,MatSnackBarHorizontalPosition} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseurl = environment.baseUrl;
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  headers: HttpHeaders;
  constructor(private http:HttpClient,private snackbar:MatSnackBar,private router:Router) {
    this.headers = new HttpHeaders();
  this.headers = this.headers.append('authorization', 'http://localhost:4200');
   }
  

  //signup
  signup(value):Observable<any>{
   return this.http.post(this.baseurl+'/user',value)
  }

  //login
  login(value):Observable<any>{
    return this.http.put(this.baseurl+'/user',value,{withCredentials: true,headers:this.headers})
  }

  

  //check session
  isAuthenticated(){
    return this.http.get(this.baseurl+'/user',{withCredentials:true,headers: this.headers}).toPromise().then(data=>{
      console.log(data)
       if(data['user']) {
         return true;
        }
        this.router.navigate(['/auth/login'])
          return false;
     })
  }


  //check exist
  emailExists(email):Observable<any>{
    return this.http.get(this.baseurl+'/user/checkemail/'+email)
  }

  //toast
  openSnackBar(message: string, type?: string) {
    let config = new MatSnackBarConfig();
    if(type == 'error'){
      
    config['panelClass'] = ['background-red'];
    }
    else{
      config['panelClass'] = ['background-green'];
    }
    config['duration'] = 4000;
    config['horizontalPosition'] = this.horizontalPosition;
    config['verticalPosition'] = this.verticalPosition;
    this.snackbar.open(message, '', config);
  }
}

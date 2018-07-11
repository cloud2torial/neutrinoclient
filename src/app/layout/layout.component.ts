import { Component, OnInit } from '@angular/core';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {HomeService} from '../service/home.service';

@Component({
  selector: 'neutrino-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  baseurl = environment.baseUrl;
  headers: HttpHeaders;
  productlength:number;
  constructor(private http:HttpClient,private router:Router,public home:HomeService) {
    this.home.myProduct$.subscribe((data)=>{
      this.productlength = data;
    })
    this.headers = new HttpHeaders();
    this.headers = this.headers.append('authorization', 'http://localhost:4200');
   }

  ngOnInit() {
    this.home.getcart();
  }


//logout
logout(){
   this.http.delete(this.baseurl+'/user',{withCredentials:true,headers:this.headers}).subscribe((data)=>{
    this.router.navigate(['/auth/login'])
   })
}
}

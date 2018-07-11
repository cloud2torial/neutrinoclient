import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import { Observable } from 'rxjs';
import {BehaviorSubject,Subject} from 'rxjs'
import {MatSnackBar,MatSnackBarConfig,MatSnackBarVerticalPosition,MatSnackBarHorizontalPosition} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  baseurl=environment.baseUrl;
  myProduct$: Observable<any>;
  private productSubject: Subject<any>;
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  headers: HttpHeaders;
  public products=[];

  constructor(private http:HttpClient,private snackbar:MatSnackBar) { 
    this.productSubject = new Subject<any>();
        this.myProduct$ = this.productSubject.asObservable();
    this.headers = new HttpHeaders();
  this.headers = this.headers.append('authorization', 'http://localhost:4200');
  }

  getproducts():Observable<any>{
    return this.http.get(this.baseurl+'/products')
   }

   getcart(){
    this.http.get(this.baseurl+'/cart',{withCredentials: true,headers:this.headers}).subscribe((data)=>{
      console.log(data)
      this.products = data['products']
      this.productSubject.next(this.products.length);
    })
   }

   addtocart(product):Observable<any>{
     return this.http.post(this.baseurl+'/cart',product,{withCredentials: true,headers:this.headers});
   }
   
   checkexist(product){
     if(this.products.length!=0){
    let obj = this.products.find(o => o.product_id == product['product_id']);
     if(obj){
       return true
     }
     return false
    }
   }

   addproduct(product){
    this.products.push(product)
    console.log(this.products.length)
    this.productSubject.next(this.products.length);
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

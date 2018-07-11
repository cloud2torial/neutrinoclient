import { Component, OnInit } from '@angular/core';
import {HomeService} from '../service/home.service';

@Component({
  selector: 'neutrino-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private home:HomeService) { }
  products:any[];
  ngOnInit() {
    this.home.getproducts().subscribe((data)=>{
      console.log(data)
      this.products = data['products'];
    })
  }
  addtocard(product){
    if(!this.home.checkexist(product)){
    this.home.addtocart(product).subscribe((data)=>{
      console.log(data)
      this.home.addproduct(product)
      this.home.openSnackBar('added to  cart successfully','success')
    })
  }
}
  

}

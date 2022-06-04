import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
singeltoken :any
  constructor(public global :GlobalService) {
    let token = localStorage.getItem("token")
    if (token) {
      this.global.isLogin = true
    }
   }

  ngOnInit(): void {
  }
  handlelogOut(){
    // this.global.logOut().subscribe(res=>{
      // console.log(res)
      localStorage.removeItem("token")
      this.global.isLogin = false
  
    // })
  }

}

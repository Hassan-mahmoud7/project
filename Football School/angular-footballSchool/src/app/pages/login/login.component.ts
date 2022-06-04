import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

// import { Router } from 'express';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })
  
  isSubmitted = false
  errorMasg:any=null
  constructor(private global : GlobalService , private router :Router,private toastr: ToastrService ) { 
    let token = localStorage.getItem("token")
    if(token) this.router.navigateByUrl("profil")
  }
  get userInfo() { return this.loginForm.controls }
  singlUser : any = []
  ngOnInit(): void {
  }
  handlelogin() {
    this.isSubmitted = true
    console.log(this.loginForm)
    if(this.loginForm.valid){
      this.global.login(this.loginForm.value).subscribe(res=>{
        console.log(res)
        this.router.navigateByUrl(`profil/${res.data.player._id}`)
        this.toastr.success('welcome', 'myprofil');
        localStorage.setItem("token", res.access_token)
        this.global.isLogin = true
          if(res.message){
            this.errorMasg = res.message
            
        }
      })
    }
    else{
      this.toastr.error('Please complete the evidence', 'not fond')
        
    }

  }
}

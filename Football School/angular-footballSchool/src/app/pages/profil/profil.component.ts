import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
id :any
showProfil:any=[]
  constructor(private _activated : ActivatedRoute, private global : GlobalService) { }

  ngOnInit(): void {
    console.log(this._activated.snapshot.paramMap.get("userId"))
    this.id = this._activated.snapshot.paramMap.get("userId")
  this._activated.paramMap.subscribe(params=>{
    console.log(params.get("userId"))
  })
  this.global.profil(this.id).subscribe(profil =>{
    console.log(profil)
    this.showProfil = profil.data
  })
  this.global.profiladmin(this.id).subscribe(profil =>{
    console.log(profil)
    this.showProfil = profil.data
  })
  }
}

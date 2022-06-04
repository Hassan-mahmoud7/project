import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  urlPath = "http://localhost:3000"
  public isLogin :boolean = false

  constructor(private http: HttpClient) { }
  login(obj: any): Observable<any> {
    return this.http.post(`${this.urlPath}/user/login`, obj)
  }
  signUp(obj: any): Observable<any> {
    return this.http.post(`${this.urlPath}/user/register`, obj)
  }
  profil(id:any):Observable<any>{
    return this.http.get(`${this.urlPath}/user/all/${id}`,)
  }
  profiladmin(id:any):Observable<any>{
    return this.http.get(`${this.urlPath}/post/add${id}`,)
  }
  // logOut(): Observable<any> {
    // return this.http.post(`${this.urlPath}/user/logoutAll`, null)
  // }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private host: string = "http://localhost:8080";
  private jwtToken: string; 
  private roles : Array<any> = [];
  public email: string;

  constructor(private http: HttpClient) { }

  login(data) {
      return this.http.post(this.host + "/login", data, {observe: 'response'});
  }

  saveToken(jwt: string){
    this.jwtToken = jwt;
    localStorage.setItem('token', jwt);
    let jwtHelper = new JwtHelper();
    this.roles = jwtHelper.decodeToken(this.jwtToken).roles;
    this.email = jwtHelper.decodeToken(this.jwtToken).sub;
  }

  loadToken(){
    this.jwtToken = localStorage.getItem('token');
  }

  getUserInfo(email: string){
    if(this.jwtToken == null) this.loadToken();
    return this.http.get(this.host + "/api/v1/users/getUser/ByEmail?email=" + email + "", {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }

  logout(){
    this.jwtToken =null;
    localStorage.removeItem('token');
  }

  isAdmin(){
    for(let r of this.roles){
      if(r.authority == 'ADMIN') return true;
    }
    return false;
  }

  isMember(){
    for(let r of this.roles){
      if(r.authority == 'MEMBER') return true;
    }
    return false;
  }

  isvisiter(){
    for(let r of this.roles){
      if(r.authority == 'USER') return true;
    }
    return false;
  }
}

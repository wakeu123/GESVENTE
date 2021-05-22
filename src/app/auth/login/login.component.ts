import { tokenize } from '@angular/compiler/src/ml_parser/lexer';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from '../services/-services.service';
import { JwtHelper } from 'angular2-jwt';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit
{
  infoUser;
  mode : number = 0;
  constructor(private authService: ServicesService, private router: Router){}

  ngOnInit() {}

  onLogin(dataForm){
    this.authService.login(dataForm)
    .subscribe(data =>{
      let accesstoken  = data.body['access-token'];
      this.authService.saveToken(accesstoken);
      //this.router.navigate(['/userProfil']); 
      let jwtHelper = new JwtHelper();
      let email = jwtHelper.decodeToken(accesstoken.sub);
      this.infoUser = this.authService.getUserInfo(email);
      console.log(this.infoUser);
    }, err =>{
        this.mode = 1;
        console.log(err);
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  templateUrl: './forgotpassword.html',
  styleUrls: ['./forgotpassword.css']
})
export class ForgotPasswordPage implements OnInit{
	email_format = /\S+@\S+\.\S+/;
	emailform = true;
	email:any;
	showform = false;
	password:any;
	validate_password:any;
	reset_token:any;
	returnform = false;

	constructor(private _router: Router, private _authService: AuthService){}
	ngOnInit(){}

	submitEmail(){
		if(this.email && this.email_format.test(this.email)){
			this._authService.sendForgotPasswordEmail(this.email).subscribe(res => {
				this.showform = true;
				this.emailform = false;
			});
		} else {
			alert("Insert valid email");
		}
	}

	changePassword(){
		if(this.password && this.password.length && this.validate_password && this.validate_password == this.password && this.reset_token){
			this._authService.changePassword(this.reset_token, this.password, this.email).subscribe(res => {
				if(res.STATUS == 'success'){
					this.showform = false;
					this.returnform = true;
				}
			});
		}	
	}
}

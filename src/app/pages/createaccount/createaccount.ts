import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  templateUrl: './createaccount.html',
  styleUrls: ['./createaccount.css']
})
export class CreateAccountPage implements OnInit{
	validated = false;
	email:any; emailvalid = false;
	firstname:any; lastname:any;
	username:any; usernamevalid = false;
	password:any; passwordvalid = false;
	validate_password:any; validatepassvalid = false;
	description:any;
	email_format = /\S+@\S+\.\S+/;
	showerror = false;
	errormessage:any;
	constructor(private _router: Router, private _authService: AuthService){}
	ngOnInit(){}

	clickValidation(){
		this.validated = !this.validated;
	}

	formChange(){
		if(this.email && this.email.length && this.email_format.test(this.email)){this.emailvalid = true;}
		if(this.username && this.username.length){this.usernamevalid = true;}
		if(this.password && this.password.length){this.passwordvalid = true;}
		if(this.validate_password && this.password && this.validate_password == this.password){this.validatepassvalid = true;}
	}

	clearForm(){
		this.validated = false;
		this.email = ''; this.emailvalid = false;
		this.firstname = ''; this.lastname = '';
		this.username = ''; this.usernamevalid = false;
		this.password = ''; this.passwordvalid = false;
		this.validate_password = ''; this.validatepassvalid = false;
		this.description = '';
	}

	validateForm(){
		if(this.usernamevalid && this.emailvalid && this.passwordvalid && this.validatepassvalid && this.validated){
			return true;
		}else{
			return false;
		}
	}

	createAccount(){
		if(this.validateForm()){
			let user = {
				'email': this.email,
				'firstName': this.firstname,
				'lastName': this.lastname,
				'password': this.password,
				'name': this.username,
				'description': this.description || ''
			}
	        this._authService.createAccount(user).subscribe(res => {
	        	if(res.status != 200){
	        		this.showerror = true;
	        		this.errormessage = res.message;
	        	} else {
	        		this._authService.login(this.email,this.password).subscribe(res => {
						(res.success == false) ? alert('Invalid login info. Try again please.') : this._router.navigate(['home']);
					});
	        	}
	        });

		}else{

			alert("Please check the checkbox and/or fill out all required forms");
		}
	}
}

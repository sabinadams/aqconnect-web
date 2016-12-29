import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';


@Component({
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginPage implements OnInit{
	constructor(private _authService: AuthService, private _router: Router){}
	ngOnInit(){
		if(localStorage.getItem('user') && localStorage.getItem('token')){
			this._router.navigate(['home']);
		}
	}
	login(email, password){
		this._authService.login(email, password).subscribe(res => {
			(res.success == false) ? alert('Invalid login info. Try again please.') : this._router.navigate(['home']);
		});
	}
}

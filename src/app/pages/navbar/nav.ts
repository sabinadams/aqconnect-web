import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'navbar',
  templateUrl: './nav.html',
  styleUrls: ['./nav.css']
})
export class NavComponent implements OnInit{
	user:any;
	constructor(private _router: Router, private _authService: AuthService){}

	ngOnInit(){
		this.user = JSON.parse(localStorage.getItem('user'));
	}

	logout(){
		this._authService.logout().subscribe(res => {
			if(res.status == 200){
				this._router.navigate(['']);
			}
		});
	}

}

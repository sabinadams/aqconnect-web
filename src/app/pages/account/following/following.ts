import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth-service';
@Component({
  templateUrl: './following.html',
  styleUrls: ['./following.css']
})
export class FollowingPage implements OnInit{

	constructor(private _router: Router, private _authService: AuthService){}
	followInfo:any;
	user = JSON.parse(localStorage.getItem('user'));
	ngOnInit(){
		this._authService.getFollows().subscribe(res => {
			this.followInfo = res.data;
		});
	}

	openProfile(userID){
    	this._router.navigate(['/users', {outlets: {'userpage': ['userprofile', userID]}}]);
    }	
}

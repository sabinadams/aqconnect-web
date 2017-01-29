import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';
@Component({
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit{

	constructor(private _router: Router, private _authService: AuthService){}
	followInfo:any;
	user = JSON.parse(localStorage.getItem('user'));
	ngOnInit(){
		this._authService.getFollows().subscribe(res => {
			this.followInfo = res.data;
		});
	}

	gotoFollowers(){
    	this._router.navigate(['/account/followers']);
    }
    gotoFollowing(){
    	this._router.navigate(['/account/following']);
    }
    gotoUserPosts(){
    	this._router.navigate(['/userforumposts']);
    }

}

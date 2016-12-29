import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user-service';


@Component({
  selector: 'userlist',
  templateUrl: './userlist.html',
  styleUrls: ['./userlist.css']
})
export class UserListPage implements OnInit{
	users;
	FIVE_MINUTES = 5 * 60 * 1000; /* ms */

	constructor(private _router: Router, private _userService: UserService){}

	ngOnInit(){
		this._userService.getAllUsers().subscribe(res => {
			this.users = res;
		});
	}	
	
	openProfile(userID){
    	this._router.navigate(['/users', {outlets: {'userpage': ['userprofile', userID]}}]);
    }	
}

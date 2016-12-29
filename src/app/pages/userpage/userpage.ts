import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user-service';

@Component({
  templateUrl: './userpage.html',
  styleUrls: ['./userpage.css']
})
export class UserPage implements OnInit{
	user:any;
	nobadge = true;
	chosenbadge:any;
	constructor( private _activeRoute: ActivatedRoute, private _router: Router, private _userService: UserService ){}

	// Grabs data on page initialization
	ngOnInit(){
		this._activeRoute.params.subscribe(params => {
			this.nobadge = true;
			this.chosenbadge = "";
			this._userService.getUserByID(+params['userID']).subscribe(res => {
				this.user = res;
			});
		});
	}

	showBadge(badge, index){
		if(this.chosenbadge) this.user.badges[this.chosenbadge.index]['chosen'] = "";
		this.user.badges[index]['chosen'] = true;
		this.nobadge = false;
		this.chosenbadge = {'value': badge, 'index': index};
	}
}

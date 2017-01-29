import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user-service';
declare var $: any;
@Component({
  templateUrl: './userpage.html',
  styleUrls: ['./userpage.css']
})
export class UserPage implements OnInit{
	user:any;
	nobadge = true;
	chosenbadge:any;
	userID = JSON.parse(localStorage.getItem('user')).Id;
	unfollowHover = false;
	constructor( private _activeRoute: ActivatedRoute, private _router: Router, private _userService: UserService ){}

	// Grabs data on page initialization
	ngOnInit(){
		this._activeRoute.params.subscribe(params => {
			this.nobadge = true;
			this.chosenbadge = "";
			this._userService.getUserByID(+params['userID'], this.userID).subscribe(res => {
				this.user = res;
				this.user.ID = +params['userID'];
				if($('body').attr("class") != "modal-open"){
	   		    	document.getElementById('toggler').click();
	   		    }
			});
		});
	}

	showBadge(badge, index){
		if(this.chosenbadge) this.user.badges[this.chosenbadge.index]['chosen'] = "";
		this.user.badges[index]['chosen'] = true;
		this.nobadge = false;
		this.chosenbadge = {'value': badge, 'index': index};
	}

	handleFollow( followID ){
		this._userService.handleFollow( followID ).subscribe(res => {
			if(res.status == 200){
				this.user.FOLLOWING = !this.user.FOLLOWING;
			}
		});
	}
}

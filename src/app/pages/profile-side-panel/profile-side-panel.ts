import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';
@Component({
  selector: 'profile-side-panel',
  templateUrl: './profile-side-panel.html',
  styleUrls: ['./profile-side-panel.css']
})
export class ProfileSidePanelComponent implements OnInit{

	constructor(private _router: Router, private _authService: AuthService){}
	followInfo:any;
	user = JSON.parse(localStorage.getItem('user'));
  onlineFollows = [];
	ngOnInit(){
		this.updateFollowerInfo();

    setInterval(() => {
        this.updateFollowerInfo();
    }, 30000)
	}

    updateFollowerInfo(){
      if(localStorage.getItem('user')){
        this._authService.getFollows().subscribe(res => {
          this.followInfo = res.data;
          this.onlineFollows = this.followInfo.following.filter((following) => {
            return following.online < 3;
          });
        });
      }
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

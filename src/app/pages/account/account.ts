import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import 'rxjs/add/operator/map';
declare var $: any;
@Component({
  templateUrl: './account.html',
  styleUrls: ['./account.css']
})
export class AccountPage implements OnInit{
	user = JSON.parse(localStorage.getItem('user'));
	newimage:any;
	picloaded = true;
	emailloaded = true;
	descloaded = true;
	nameloaded = true;
	twitterloaded = true;
	facebookloaded = true;
	showmessage = false;
	showerror = false;
	disablesuccess = false;
	disableerror = false;
	error:string;
	message:string;
	followInfo:any;
	constructor( private _activeRoute: ActivatedRoute, private _router: Router, private _authService: AuthService ){}

	// Grabs data on page initialization
	ngOnInit(){
		if(!localStorage.getItem('user') || !localStorage.getItem('token')){
			this._router.navigate(['']);
		}
		this._authService.getFollows().subscribe(res => {
			if(res.status == 200){
				this.followInfo = res.data;
			}
		});
	}


	//Sends the image through a function whenever the file input is used
	changeListener($event) : void {
	  this.changeProfilePic($event.target);
	}

	openProfile(userID){
    	this._router.navigate(['/users', {outlets: {'userpage': ['userprofile', userID]}}]);
    }	

	showMessage(message, type){
		if(type == 'success'){
			this.message = message;
			this.showmessage = true;
			setTimeout( () => {
				this.message = "";
				this.showmessage = false;
			}, 3000);
		}else if (type == 'error'){
			this.error = message;
			this.showerror = true;
			setTimeout( () => {
				this.error = "";
				this.showerror = false;
			}, 3000);
		}
	}
	//Converts file to base64
	changeProfilePic(inputValue: any): void {
	  var file:File = inputValue.files[0];
	  var myReader:FileReader = new FileReader();

	  myReader.onloadend = (e) => {
	    this.newimage = myReader.result;
	    this.picloaded = false;
		this._authService.changeProfilePic(this.newimage).subscribe(res => {
			if(res.status.status == 200){
    			this.user = res.user;
    			localStorage.setItem('user', JSON.stringify(res.user));
    			this.picloaded = true;
    			this.showMessage("Profile picture successfully changed.", 'success');
    			
    		}else {
    			this.showMessage("Error changing profile picture.", 'error');
    			this.picloaded = true;

    		}
		});
	  }
	  myReader.readAsDataURL(file);
	}

	disableAccount( pass ){
		if(pass.trim().length){
			this._authService.disableAccount( pass ).subscribe(res => {
				if(res.status == 'success'){
					this.message = res.status_message;
					this.disablesuccess = true;
					setTimeout( () => {
						this.message = "";
						this.disablesuccess = false;
						localStorage.removeItem('user');
						localStorage.removeItem('token');
					    document.getElementById('toggler').click();
						this._router.navigate(['']);
					}, 3000);
				} else {
					this.error = res.status_message;
					this.disableerror = true;
					setTimeout( () => {
						this.error = "";
						this.disableerror = false;
					}, 3000);
				}
			});
		}
	}

	changeUsername(newname){
		if(newname){
			this.nameloaded = false;
			this._authService.changeUserName(newname).subscribe(res => {
	    		if(res.status == "success"){
	    			this.user = JSON.parse(localStorage.getItem('user'));
	    			this.nameloaded = true;
	    			this.showMessage(`Successfully changed your username to ${newname}`, 'success');
	    		}else {
	    			this.showMessage(res.status_message, 'error');
	    			this.nameloaded = true;
	    		}
	    	});
		}
	}

	changeEmail(newemail){
		if(newemail){
			this.emailloaded = false;
			this._authService.changeEmail(newemail).subscribe(res => {
	    		if(res.status == "success"){
	    			this.user = JSON.parse(localStorage.getItem('user'));
	    			this.emailloaded = true;
	    			this.showMessage("Successfully updated your account's email address", 'success');
	    		}else {
	    			this.showMessage(res.status_message, 'error');
	    			this.emailloaded = true;
	    		}
	    	});
		}
	}

	changeDescription(newdescription){
		if(newdescription){
			this.descloaded = false
			this._authService.changeDescription(newdescription).subscribe(res => {
	    		if(res.status == "success"){
	    			this.user = JSON.parse(localStorage.getItem('user'));
	    			this.descloaded = true;
	    			this.showMessage("Successfully updated your account's description.", 'success')
	    		}else {
	    			this.showMessage(res.status_message, 'error');
	    			this.descloaded = true;
	    		}
	    	});
		}
	}

	changeTwitter(newtwitter){
		if(newtwitter){
			this.descloaded = false
			this._authService.changeTwitter(newtwitter).subscribe(res => {
	    		if(res.status == "success"){
	    			this.user = JSON.parse(localStorage.getItem('user'));
	    			this.descloaded = true;
	    			this.showMessage("Successfully updated your Twitter link.", 'success')
	    		}else {
	    			this.showMessage(res.status_message, 'error');
	    			this.descloaded = true;
	    		}
	    	});
		}
	}

	changeFacebook(newfacebook){
		if(newfacebook){
			this.descloaded = false
			this._authService.changeFacebook(newfacebook).subscribe(res => {
	    		if(res.status == "success"){
	    			this.user = JSON.parse(localStorage.getItem('user'));
	    			this.descloaded = true;
	    			this.showMessage("Successfully updated your account's FaceBook link.", 'success')
	    		}else {
	    			this.showMessage(res.status_message, 'error');
	    			this.descloaded = true;
	    		}
	    	});
		}
	}


}

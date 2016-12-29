import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import 'rxjs/add/operator/map';

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
	showmessage = false;
	showerror = false;
	error:string;
	message:string;
	constructor( private _activeRoute: ActivatedRoute, private _router: Router, private _authService: AuthService ){}

	// Grabs data on page initialization
	ngOnInit(){
		if(!localStorage.getItem('user') || !localStorage.getItem('token')){
			this._router.navigate(['']);
		}
	}


	//Sends the image through a function whenever the file input is used
	changeListener($event) : void {
	  this.changeProfilePic($event.target);
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


}

import { Component, OnInit, ViewEncapsulation, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { SocialService } from '../../services/social-service';
import { MarkdownParserService } from '../../services/markdown-service';

@Component({
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [ MarkdownParserService ]
})
export class HomeComponent implements OnInit{

	constructor(lc: NgZone, private _router: Router, private _authService: AuthService, private _socialService: SocialService, private md: MarkdownParserService){
		window.onscroll = () => {
		         let status = "not reached";
		         let windowHeight = "innerHeight" in window ? window.innerHeight
		             : document.documentElement.offsetHeight;
		         let body = document.body, html = document.documentElement;
		         let docHeight = Math.max(body.scrollHeight,
		             body.offsetHeight, html.clientHeight,
		             html.scrollHeight, html.offsetHeight);
		         let windowBottom = windowHeight + window.pageYOffset;
		         if (windowBottom >= docHeight && this.end == false) {
		           this._socialService.getPosts(this.index).subscribe(res => {
		           	for(let post of res){
		           		post.body = this.md.convert(post.body);
		           		post.IMAGES = post.IMAGES.split(',');
		           	}
		           	this.posts.push(...res);
		           	this.index += 20;
		           	if(res.length < 20){
		           		this.end = true;
		           	}
		           });

		         }
		      };
	}
	rows = 1;
	postText = '';
	posts: any;
	index = 0;
	newimage:any;
	images = [];
	user = JSON.parse(localStorage.getItem('user'));
	userID = this.user.Id;
	end = false;
	uploading = false;
	commentText="";
	ngOnInit(){
		this._socialService.getPosts(this.index).subscribe(res => {
			this.posts = res;
			console.log(res);
			this.index += 20;
			for(let post of this.posts){
				post.body = this.md.convert(post.body);
				post.IMAGES = post.IMAGES.split(',');
			}

			if(res.length < 20){
				this.end = true;
			}
		});

		

	}


	checkBlur(){
		if(this.postText.length < 1){
			this.rows = 1;
		}
	}

	//Converts file to base64
	saveImage(inputValue: any): void {
	  var file:File = inputValue.files[0];
	  var myReader:FileReader = new FileReader();
	  myReader.onloadend = (e) => {
	    this.newimage = myReader.result;
		this._socialService.uploadPic(this.newimage).subscribe(res => {
			this.images.push(res.data.link);
			this.uploading = false;
		});
	  }
	  myReader.readAsDataURL(file);
	}

	//Sends the image through a function whenever the file input is used
	changeListener($event) : void {
	  if(this.images.length < 7){
	  	this.uploading = true;
	  	this.saveImage($event.target);
	  }
	}

	savePost(){
		let post = {
			'text': this.postText || "   ",
			'images': this.images
		}
		if(this.postText.length > 0 || (this.images.length && this.images.length < 7)){
			this._socialService.savePost(post).subscribe(res => {
				location.reload();
			});
		}
	}

	removeUpload(index) {
		this.images.splice(index, 1);
	}

	//Likes and unlikes replies
	likePost(post, i){
		 console.log(post);
		 var data = {
            'postID': post.ID,
            'userID': this.userID,
            'token':this.user.token,
            'posterID': post.user_ID
        }
		if(post.LIKEID != this.user.Id){
			this._socialService.likePost(data).subscribe(res => {
				this.posts[i].LIKEID = this.userID;
				this.posts[i].likes += 1;
				// console.log(this.posts[i]);
				// console.log(this.userID);
			});		
		}else{
			this._socialService.likePost(data).subscribe(res => {
				if(res.status == 200){
					this.posts[i].LIKEID = "";
					this.posts[i].likes -= 1;
					// console.log(this.posts[i]);
					// console.log(this.userID);
				}
			});
		}
 }   
}

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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

	constructor(private _router: Router, private _authService: AuthService, private _socialService: SocialService, private md: MarkdownParserService){}
	rows = 1;
	postText = '';
	posts: any;
	index = 0;
	newimage:any;
	images = [];
	user = JSON.parse(localStorage.getItem('user'));
	ngOnInit(){
		this._socialService.getPosts(this.index).subscribe(res => {
			this.posts = res;
			console.log(res);
			this.index += 10;
			for(let post of this.posts){
				post.body = this.md.convert(post.body);
				post.IMAGES = post.IMAGES.split(',');
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
	  console.log(inputValue);
	  var myReader:FileReader = new FileReader();
	  myReader.onloadend = (e) => {
	    this.newimage = myReader.result;
		this._socialService.uploadPic(this.newimage).subscribe(res => {
			console.log(res);
			this.images.push(res.data.link);
		});
	  }
	  myReader.readAsDataURL(file);
	}

	//Sends the image through a function whenever the file input is used
	changeListener($event) : void {
		console.log($event);
	  this.saveImage($event.target);
	}

	savePost(){
		let post = {
			'text': this.postText,
			'images': this.images
		}
		if(this.postText.length > 0){
			this._socialService.savePost(post).subscribe(res => {
				console.log(res);
			});
		}
	}
}

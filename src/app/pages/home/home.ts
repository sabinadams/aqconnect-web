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
	ngOnInit(){
		this._socialService.getPosts(this.index).subscribe(res => {
			this.posts = res;
			console.log(res);
			this.index += 10;
			for(let post of this.posts){
				post.body = this.md.convert(post.body);
			}
		});
	}

	checkBlur(){
		if(this.postText.length < 1){
			this.rows = 1;
		}
	}

	savePost(){
		if(this.postText.length > 0){
			this._socialService.savePost(this.postText).subscribe(res => {
				console.log(res);
			});
		}
	}
}

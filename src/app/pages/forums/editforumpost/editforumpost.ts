import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ForumService } from '../../../services/forum-service';

@Component({
  templateUrl: './editforumpost.html',
  styleUrls: ['./editforumpost.css']
})
export class EditForumPostPage implements OnInit{
	constructor(private _router: Router, private _forumService: ForumService, private _activeRoute: ActivatedRoute){}
	postID: any;
	post:any;
	ngOnInit(){
		this._activeRoute.params.subscribe(params => {
			this.postID = +params['postID'];
			this._forumService.getPostByUser(this.postID).subscribe(res => {this.post = res[0];});
		});
	}


	updatePost(){
		this._forumService.updatePost(this.post).subscribe();
	}
}

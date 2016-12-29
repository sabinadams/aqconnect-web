import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ForumService } from '../../services/forum-service';
@Component({
  templateUrl: './userforumposts.html',
  styleUrls: ['./userforumposts.css']
})
export class UserForumPostsPage implements OnInit {
	constructor(private _router: Router, private _forumService: ForumService){}
	posts:any;
	ngOnInit(){
		this._forumService.getPostsByUser().subscribe(res => {
			this.posts = res;
		});
	}

	deletePost(post, i){
		if( confirm("Are you sure you want to delete this post?") ){
			this.posts.splice(i, 1);
            this._forumService.deleteForumPost(post).subscribe();
        }
	}

	openPost(postID){
		this._router.navigate(['/forums', {outlets: {'forumpostpage': ['forumpost', postID]}}]);
	}


}

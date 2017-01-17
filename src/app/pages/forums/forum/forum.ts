import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ForumService } from '../../../services/forum-service';
@Component({
  templateUrl: './forum.html',
  styleUrls: ['./forum.css']
})
export class ForumPage implements OnInit{
	constructor( private _activeRoute: ActivatedRoute, private _router: Router, private _forumService: ForumService){}
	posts:any;
	start = 0;
	forumID;
	userID = JSON.parse(localStorage.getItem('user')).Id;
	loading = true;
	preview = false;
	ngOnInit(){
		this._activeRoute.params.subscribe(params => {
			this.forumID = +params['forumID'];
			this._forumService.getPostsByForum(+params['forumID'], this.userID, this.start).subscribe(res => { this.loading = false; this.posts = res;});
		});
	}

	loadMore(){
		this.start += 20;
		this._activeRoute.params.subscribe(params => {
	       this._forumService.getPostsByForum(+params['forumID'], this.userID, this.start ).subscribe(res => {
	       		this.posts.push(...res);
	       }); // (+) converts string 'id' to a number
	    });  
	}
	openPost(postID){
		this._router.navigate(['/forums', {outlets: {'forumpostpage': ['forumpost', postID]}}]);
	}
	 //Likes and unlikes replies
	likePost(index){
		 var data = {
            'postID': this.posts[index].ID,
            'userID': this.userID,
            'token': localStorage.getItem('token'),
            'posterID': this.posts[index].user_ID
        }
		if(this.posts[index].LIKEID != this.userID){
			this._forumService.likePost(data).subscribe( res => {
				if(res.status == 200){
					this.posts[index].LIKEID = this.userID;
					this.posts[index].likes += 1;
				}
			});		
		}else{
			this._forumService.likePost(data).subscribe(res => {
				if(res.status == 200){
					this.posts[index].LIKEID = "";
					this.posts[index].likes -= 1;
				}
			});
		}

    }
    deletePost(post, i){
		if( confirm("Are you sure you want to delete this post?") ){
            this._forumService.deleteForumPost(post).subscribe(res => {
            	if(res.status == 200){
            		this.posts.splice(i, 1);
            	}
            });
        }
	}
    post(title, body){
    	 var data = {
            "title": title,
            "body": body,
            "user": JSON.parse(localStorage.getItem('user')),
            "forumID": this.forumID
        };
        if(data.body.trim() && data.title.trim()){
	    	this._forumService.post(data).subscribe(res => {
	    		this.posts.unshift(JSON.parse(res._body)[0]);
	    	});
	    } else {
	    	alert("Please make sure you have a title and message.");
	    }
    }
}

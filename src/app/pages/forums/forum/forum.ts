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
			this.posts[index].LIKEID = this.userID;
			this.posts[index].likes += 1;
			this._forumService.likePost(data).subscribe();		
		}else{
			this.posts[index].LIKEID = "";
			this.posts[index].likes -= 1;
			this._forumService.likePost(data).subscribe();
		}
    }

    post(title, body){
    	console.log(body);
    	 var data = {
            "title": title,
            "body": body,
            "user_ID": this.userID,
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

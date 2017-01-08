import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ForumService } from '../../../services/forum-service';

@Component({
  templateUrl: './forumpost.html',
  styleUrls: ['./forumpost.css']
})
export class ForumPostPage implements OnInit{
	constructor(private _router: Router, private _activeRoute: ActivatedRoute, private _forumService: ForumService){}
	post:any;
	userID = JSON.parse(localStorage.getItem('user')).Id;
	username = JSON.parse(localStorage.getItem('user')).username;
	start = 0;
	popularity: any;
	ngOnInit(){
		this._activeRoute.params.subscribe(params => {
	       this._forumService.getPostsByID(+params['postID'], this.userID, this.start ).subscribe(res => {
	       		this.post = res;
	       		this.popularity = (res.POSTCOUNT/2) + (res.USERLIKES/2);
	       }); // (+) converts string 'id' to a number
	    });   
	}

	//Likes and unlikes replies
	likeReply(index){
		 var data = {
            'replyID': this.post.replies[index].ID,
            'userID': this.userID,
            'token': localStorage.getItem('token'),
            'posterID': this.post.replies[index].user_ID
        }
		if(this.post.replies[index].LIKEID != this.userID){
			this._forumService.likeReply(data).subscribe( res => {
				if(res.status == 200){
					this.post.replies[index].LIKEID = this.userID;
					this.post.replies[index].likes += 1;
				}
			});		
		}else{
			this._forumService.likeReply(data).subscribe(res => {
				if(res.status == 200){
					this.post.replies[index].LIKEID = "";
					this.post.replies[index].likes -= 1;
				}
			});
		}
    }
    //Likes and unlikes replies
	likePost(){
		 var data = {
            'postID': this.post.ID,
            'userID': this.userID,
            'token': localStorage.getItem('token'),
            'posterID': this.post.user_ID
        }
		if(this.post.LIKEID != this.userID){
			this._forumService.likePost(data).subscribe(res => {
				if(res.status == 200){
					this.post.LIKEID = this.userID;
					this.post.likes += 1;
				}
			});		
		}else{
			this._forumService.likePost(data).subscribe(res => {
				if(res.status == 200){
					this.post.LIKEID = "";
					this.post.likes -= 1;
				}
			});
		}
    }

    sendReply(body){
		var data = {
	        "body": body,
	        "post_ID": this.post.ID,
	        "user_ID": this.userID,
	        "replierName": this.username
	    };
	    if(data.body.trim()){
	    	this._forumService.reply(data).subscribe(res => {
	    		this.post.replies.unshift(JSON.parse(res._body)[0]);
	    	});
	    } else {
	    	alert("No Message");
	    }
    }

	loadMore(){
		this.start += 20;
		this._activeRoute.params.subscribe(params => {
	       this._forumService.getPostsByID(+params['postID'], this.userID, this.start ).subscribe(res => {
	       		this.post.replies.push(...res);
	       }); // (+) converts string 'id' to a number
	    });  
	}
	openProfile(userID){
    	this._router.navigate(['/forums', {outlets: {'forumpostpage': ['userprofile', userID]}}]);
    }

    deleteReply(reply, i){
		if( confirm("Are you sure you want to delete this reply?") ){
            this._forumService.deleteForumReply(reply).subscribe(res => {
            	if(res.status == 200){
            		this.post.replies.splice(i, 1);
            	}
            });
        }
	}

	deletePost(post){
		if( confirm("Are you sure you want to delete this post? You will be redirected to the Forums home page.") ){
            this._forumService.deleteForumPost(post).subscribe(res => {
            	if(res.status == 200){
            		this._router.navigate(['forums']);
            	}
            });
        }
	}

}

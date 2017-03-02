import { Component, OnInit, ViewEncapsulation, NgZone,OnChanges, Input, trigger, state, animate, transition, style } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { SocialService } from '../../services/social-service';
import { MarkdownParserService } from '../../services/markdown-service';
declare var $: any;
@Component({
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [ MarkdownParserService ],
  animations: [
    trigger('visibilityChanged', [
      state('true' , style({ opacity: 1, transform: 'scale(1.0)' })),
      state('false', style({ opacity: 0, transform: 'scale(0.0)'  })),
      transition('1 => 0', animate('500ms')),
      transition('0 => 1', animate('200ms'))
    ])
  ]
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
           		for(let comment of post.comments.COMMENTS){
					comment.body = this.md.convert(comment.body.toString());
				}
           		post.IMAGES = post.IMAGES.split(',');
           		post['new_comment'] = '';
           		post['singleComment'] = true;
           		post['comment_images'] = [];
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
	newposts = [];
	index = 0;
	newimage:any;
	images = [];
	user = JSON.parse(localStorage.getItem('user'));
	userID = this.user.Id;
	end = false;
	uploading = false;
	loaded = false;
	newPostsAlertText = "";
	showAlert = false;
	loading_comments = false;
	saving_post = false;
	tempCommentIndex = 0;
	comment_uploading = false;
	ngOnInit(){
		this._socialService.getPosts(this.index).subscribe(res => {
			this.posts = res;
			this.index += 20;
			for(let post of this.posts){
				post.body = this.md.convert(post.body);
				for(let comment of post.comments.COMMENTS){
					comment.body = this.md.convert(comment.body.toString());
				}
				post.IMAGES = post.IMAGES.split(',');
				post['new_comment'] = '';
				post['singleComment'] = true;
				post['comment_images'] = [];
			}
			this.loaded = true;
			if(res.length < 20){
				this.end = true;
			}

		});
		$('a.page-scroll').bind('click', function(event) {
		    var $ele = $(this);
		    $('html, body').stop().animate({scrollTop: ($($ele.attr('href')).offset().top - 60)}, 1450, 'easeInOutExpo');
		    event.preventDefault();
		}); 
		setInterval(() => {
			if(this.loaded){
				let tempIndex;
				if(this.newposts.length > 0 && this.newposts[0].ID){
					// console.log('Used New Posts Array', this.newposts[0].ID);
					tempIndex = this.newposts[0].ID
				}else {
					// console.log('Used The Posts Array', this.posts[0].ID);
					tempIndex = this.posts[0].ID;
				}
				//Getting this to not grab duplicates
				this._socialService.getNewPosts(tempIndex).subscribe(res => {
					if(res.length > 0) {
						for(let post of res){
							post.body = this.md.convert(post.body);
							for(let comment of post.comments.COMMENTS){
								comment.body = this.md.convert(comment.body.toString());
							}
							post.IMAGES = post.IMAGES.split(',');
							post['new_comment'] = '';
							post['singleComment'] = true;
							post['comment_images'] = [];
						}
						this.newposts.unshift(...res);
						this.loaded = false;
						this.newPostsAlert(res.length);
					}
				});
			}
		}, 2000)
	}


	checkBlur(){
		if(this.postText.length < 1){
			this.rows = 1;
		}
	}

	showComments(index){
		this.posts[index].singleComment = false;
	}
	newPostsAlert(amount){
		this.newPostsAlertText =`${amount} new posts`;
		this.showAlert = true;
		setTimeout(() => {
			this.showAlert = false;
			this.newPostsAlertText = "";
			this.loaded = true;
		}, 4000)
	}

	clickedNewPosts(){
		if(this.newposts.length){
			this.posts.unshift(...this.newposts);
		}
		this.newposts = [];
		this.showAlert = false;
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
		if(post.text.length <= 400 && (this.postText.trim().length > 0 || (this.images.length && this.images.length < 7)) && !this.saving_post){
			this.saving_post = true;
			this._socialService.savePost(post).subscribe(res => {
				this._socialService.getNewPosts(this.posts[0].ID).subscribe(res => {
					if(res.length > 0) {
						for(let post of res){
							post.body = this.md.convert(post.body);
							post.IMAGES = post.IMAGES.split(',');
							post['new_comment'] = '';
							post['comment_images'] = [];
						}
						this.newposts.unshift(res[0]);
						this.loaded = false;
						this.newPostsAlert(res.length);
					}
					this.postText = "";
					this.saving_post = false;
					this.images = [];
				});
			});
		}
	}

	removeUpload(index) {
		this.images.splice(index, 1);
	}


	openProfile(userID){
		setTimeout(() => {
    		this._router.navigate(['/users', {outlets: {'userpage': ['userprofile', userID]}}]);
		}, 200); //Used to account for the animation time which causes the modal-open class to remain on the body tag for a few extra milliseconds. Maybe change later to more efficient way
    }
	//Likes and unlikes replies
	likePost(post, i){
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
			});		
		}else{
			this._socialService.likePost(data).subscribe(res => {
				if(res.status == 200){
					this.posts[i].LIKEID = "";
					this.posts[i].likes -= 1;
				}
			});
		}
    }

    deletePost(post, index){
    	if(confirm("are you sure you want to delete the post?")){
	    	this._socialService.deletePost(post).subscribe(res => {
	    		if(res.status == 200){
	    			this.posts.splice(index, 1);
	    		}
	    	});
    	}
    }   
    getMoreComments(post, index){
    	if(!this.loading_comments){
    		this.loading_comments = true;
    		this._socialService.getComments(this.userID, post.ID, post.comments.COMMENTS.length).subscribe(res => {
    			for(let comment of res.comments.COMMENTS){
					comment.body = this.md.convert(comment.body.toString());
				}
    			this.loading_comments = false;
    			this.posts[index].comments.COMMENTS.push(...res.comments.COMMENTS);
    		});
    	}
    }
    share(post){
    	this._socialService.sharePost(post).subscribe(res => {
    		if(res.status == 200){
    			this._socialService.getNewPosts(this.posts[0].ID).subscribe(res => {
					if(res.length > 0) {
						for(let post of res){
							post.body = this.md.convert(post.body);
							post.IMAGES = post.IMAGES.split(',');
							post['new_comment'] = '';
							post['comment_images'] = [];
						}
						this.newposts.unshift(...res);
						this.loaded = false;
						this.newPostsAlert(res.length);
					}
				});
    		}
    	});
    }

    //Likes and unlikes replies
	likeComment(post, comment, i){
		 var data = {
            'commentID': comment.ID,
            'userID': this.userID,
            'token':this.user.token,
            'posterID': comment.user_ID
        }
		if(comment.LIKEID != this.user.Id){
			this._socialService.likeComment(data).subscribe(res => {
				post.comments.COMMENTS[i].LIKEID = this.userID;
				post.comments.COMMENTS[i].likes += 1;
			});		
		}else{
			this._socialService.likeComment(data).subscribe(res => {
				if(res.status == 200){
					post.comments.COMMENTS[i].LIKEID = "";
					post.comments.COMMENTS[i].likes -= 1;
				}
			});
		}
    }


    deleteComment(comment, comment_index, post_index){
    	if(confirm("are you sure you want to delete the comment?")){
	    	this._socialService.deleteComment(comment).subscribe(res => {
	    		if(res.status == 200){
	    			this.posts[post_index].comments.COMMENTS.splice(comment_index, 1);
	    		}
	    	});
    	}
    }   

    saveComment(post_index){
    	let post = this.posts[post_index];
		let comment = {
			'text': post.new_comment || "   ",
			'rootID': post.ID,
			'images': post.comment_images
		}
		console.log(comment.text)
		if(comment.text.length <= 400 && (comment.text.trim().length > 0  || comment.images.length == 1) && !this.saving_post){
			this.saving_post = true;
			this._socialService.saveComment(comment).subscribe(res => {
				if(res.status == 200){
					this.saving_post = false;
					res.comment[0].body = this.md.convert(res.comment[0].body.toString());
					this.posts[post_index].comments.COMMENTS.unshift(res.comment[0]);
					this.posts[post_index].new_comment = [];
					this.posts[post_index].comments.TOTAL_COMMENTS++;
					this.removeCommentUpload(post_index);
				}
			});
		}
	}

	//Converts file to base64
	saveCommentImage(inputValue: any, index): void {
	  	  var file:File = inputValue.files[0];
	  if(typeof file != 'undefined'){
	  	  var myReader:FileReader = new FileReader();
	  	  myReader.onloadend = (e) => {
	  	    this.newimage = myReader.result;
	  		this._socialService.uploadPic(this.newimage).subscribe(res => {
	  			this.posts[index].comment_images.push(res.data.link);
	  			this.comment_uploading = false;
	  		});
	  	  }
	  	  myReader.readAsDataURL(file);
	  	} else {
	  		this.comment_uploading = false;
	  	}
	  
	}

	//Sends the image through a function whenever the file input is used
	commentChangeListener($event, index) : void {
	  this.tempCommentIndex = index;
	  if(this.images.length < 7){
	  	this.comment_uploading = true;
	  	this.saveCommentImage($event.target, index);
	  }
	}

	removeCommentUpload(index) {
		this.posts[index].comment_images = [];
	}
}

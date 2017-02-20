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
           		post.IMAGES = post.IMAGES.split(',');
           		post['new_reply'] = [];
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
	ngOnInit(){
		this._socialService.getPosts(this.index).subscribe(res => {
			console.log(res);
			this.posts = res;
			this.index += 20;
			for(let post of this.posts){
				post.body = this.md.convert(post.body);
				post.IMAGES = post.IMAGES.split(',');
				post['new_reply'] = [];
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
				this._socialService.getNewPosts(this.posts[0].ID).subscribe(res => {
					if(res.length > 0) {
						for(let post of res){
							post.body = this.md.convert(post.body);
							post.IMAGES = post.IMAGES.split(',');
							post['new_reply'] = [];
						}
						this.newposts.unshift(...res);
						this.loaded = false;
						this.newPostsAlert(res.length);
					}
				});
			}
		}, 60000)
	}


	checkBlur(){
		if(this.postText.length < 1){
			this.rows = 1;
		}
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
		//scroll to top
		// window.scrollTo(0,0);
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
				this._socialService.getNewPosts(this.posts[0].ID).subscribe(res => {
					if(res.length > 0) {
						for(let post of res){
							post.body = this.md.convert(post.body);
							post.IMAGES = post.IMAGES.split(',');
							post['new_reply'] = [];
						}
						this.newposts.unshift(...res);
						this.loaded = false;
						this.newPostsAlert(res.length);
					}
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
    editPost(){
    	console.log("Post Edited");
    }
    share(post){
    	this._socialService.sharePost(post).subscribe(res => {
    		if(res.status == 200){
    			this._socialService.getNewPosts(this.posts[0].ID).subscribe(res => {
					if(res.length > 0) {
						for(let post of res){
							post.body = this.md.convert(post.body);
							post.IMAGES = post.IMAGES.split(',');
							post['new_reply'] = [];
						}
						this.newposts.unshift(...res);
						this.loaded = false;
						this.newPostsAlert(res.length);
					}
				});
    		}
    	});
    }
}

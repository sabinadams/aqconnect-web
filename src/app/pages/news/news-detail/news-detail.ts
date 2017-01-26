import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NewsService } from '../../../services/news-service';
declare var $: any;
@Component({
  templateUrl: './news-detail.html',
  styleUrls: ['./news-detail.css']
})
export class NewsDetailPage implements OnInit{
	constructor(private _router: Router, private _activeRoute: ActivatedRoute, private _newsService: NewsService){}
	post:any;
	userID = JSON.parse(localStorage.getItem('user')).Id;
	ngOnInit(){
		this._activeRoute.params.subscribe(params => {
	       this._newsService.getNewsByID(+params['id']).subscribe(res => {
	       		this.post = res;
	       		setTimeout(() => {
		       		if($('body').attr("class") != "modal-open"){
		   		    	document.getElementById('toggler').click();
		   		    }
		       }, 200);
	       }); // (+) converts string 'id' to a number
	    });
	}

	gotoForums(){
		document.getElementById('toggler').click();
		this._router.navigate(['forums']);
	}

	//Likes and unlikes replies
	likePost(){
		 var data = {
            'newsID': this.post.ID,
            'userID': this.userID,
            'token': localStorage.getItem('token')
        }
		if(this.post.LIKEID != this.userID){
			this._newsService.likePost(data).subscribe(res => {
				if(res.status == 200){
					this.post.LIKEID = this.userID;
				}
			});		
		}else{
			this._newsService.likePost(data).subscribe(res => {
				if(res.status == 200){
					this.post.LIKEID = "";
				}
			});
		}
    }
}

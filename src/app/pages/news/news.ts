import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewsService } from '../../services/news-service';

@Component({
  templateUrl: './news.html',
  styleUrls: ['./news.css']
})
export class NewsPage implements OnInit {
	constructor(private _router: Router, private _newsService: NewsService){}
	news:any;
	userID = JSON.parse(localStorage.getItem('user')).Id;
	ngOnInit(){
		this._newsService.getNews().subscribe(res => { console.log(res); this.news = res;});
	}

	openDetail(newsID){
    	this._router.navigate(['/news', {outlets: {'newspage': ['newsdetail', newsID]}}]);
    }

    //Likes and unlikes replies
	likePost(index){
		let data = {
			'newsID': this.news[index].ID,
		    'userID': this.userID,
		    'token': localStorage.getItem('token')
		};
		if(this.news[index].LIKEID != this.userID){
			this._newsService.likePost(data).subscribe( res => {
				if(res.status == 200){
					this.news[index].LIKEID = this.userID;
					this.news[index].likes += 1;
				}
			});
		}else{
			this._newsService.likePost(data).subscribe(res => {
				if(res.status == 200){
					this.news[index].LIKEID = "";
					this.news[index].likes -= 1;
				}
			});
		}

    }
}

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
	ngOnInit(){
		this._newsService.getNews().subscribe(res => {this.news = res;});
	}

	openDetail(newsID){
    	this._router.navigate(['/news', {outlets: {'newspage': ['newsdetail', newsID]}}]);
    }

}

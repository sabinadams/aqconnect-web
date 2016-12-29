import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NewsService } from '../../../services/news-service';

@Component({
  templateUrl: './news-detail.html',
  styleUrls: ['./news-detail.css']
})
export class NewsDetailPage implements OnInit{
	constructor(private _router: Router, private _activeRoute: ActivatedRoute, private _newsService: NewsService){}
	post:any;
	ngOnInit(){
		this._activeRoute.params.subscribe(params => {
	       this._newsService.getNewsByID(+params['id']).subscribe(res => {
	       		this.post = res;
	       }); // (+) converts string 'id' to a number
	    });
	}
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent{
	userCheck(){
		if(localStorage.getItem('user')){
			return true;
		}else{
			return false;
		}
	}	

}
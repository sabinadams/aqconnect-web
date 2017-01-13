import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { ServerStatusService } from '../../services/server-status-service';
@Component({
  selector: 'navbar',
  templateUrl: './nav.html',
  styleUrls: ['./nav.css']
})
export class NavComponent implements OnInit{
	user:any;
	servers:any;
	constructor(private _router: Router, private _authService: AuthService, private _serverStatus: ServerStatusService){}

	ngOnInit(){
		this.user = JSON.parse(localStorage.getItem('user'));
		this._serverStatus.getStats().subscribe((res) => {
			this.servers = JSON.parse(res);
		});
    }
	logout(){
		this._authService.logout().subscribe(res => {
			if(res.status == 200){
				this._router.navigate(['']);
			}
		});
	}
}

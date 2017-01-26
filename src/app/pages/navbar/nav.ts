import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { ServerStatusService } from '../../services/server-status-service';
import { NotificationService } from '../../services/notification-service';
@Component({
  selector: 'navbar',
  templateUrl: './nav.html',
  styleUrls: ['./nav.css']
})
export class NavComponent implements OnInit{
	user:any;
	servers:any;
	constructor(private _router: Router, private _authService: AuthService, private _serverStatus: ServerStatusService, private _notificationService: NotificationService){}
	notification_check = false;
	notifications:any;
	start = 0;
	ngOnInit(){
		this.notification_check = false;
		this.start = 0;
		this.notifications = [];
		this.user = JSON.parse(localStorage.getItem('user'));
		this._serverStatus.getStats().subscribe((res) => {
			this.servers = JSON.parse(res);
		});
		this.handleNotifications();
		setInterval(() => {
			this.handleNotifications();
		}, 30000);
    }
	logout(){
		this._authService.logout().subscribe(res => {
			if(res.status == 200){
				this._router.navigate(['']);
			}
		});
	}

	handleNotifications(){
		console.log(localStorage.getItem('user'));
		if(localStorage.getItem('user')){
			this._notificationService.checkNotifications().subscribe(res => {
				if(res.status != 401 ){
					this.notifications = res;
					if(this.start + res.length < 100){
						this.start += res.length;
					}
					this.notification_check = false;
					for(let notification of this.notifications){
						if(notification.read == 0) this.notification_check = true;
					}

				}
			});
		}
		
	}

	clearAllNotifications(){
		this._notificationService.clearAllNotifications().subscribe(res => {
			console.log(res);
			this.handleNotifications();
			this.notification_check = false;
		});
		this.notifications = [];
	}

	readNotification(ID){
		this._notificationService.readNotification(ID).subscribe(res => {
			console.log(res);
			this.handleNotifications();
		});
	}
}

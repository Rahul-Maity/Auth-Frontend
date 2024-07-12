import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { UserStoreService } from '../../services/user-store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{

  public users: any = [];
  public fullname: string = "";
  public role: string = "";
  constructor(private auth:AuthService,private api:ApiService, private userStore:UserStoreService) {

  }
  ngOnInit(): void {
    this.api.getUsers()
      .subscribe(res => {
        this.users = res;
      });
   
    this.userStore.getFullnameFromStore()
      .subscribe(val => {
        let fullnameFromToken = this.auth.getFullnameFromToken();
        this.fullname = val || fullnameFromToken;
      });
    this.userStore.getRoleFromStore()
      .subscribe(val => {
        let roleFromToken = this.auth.getRoleFromToken();
        this.role = val || roleFromToken;

      });

  }
  

  logout() {
    this.auth.signOut();
    }
}

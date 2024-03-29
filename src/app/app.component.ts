import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent {
  public title = 'Projecte ASW';
  public identity;
  public token;

  constructor(
    private _userService: UserService
  ){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit() {
  }
}

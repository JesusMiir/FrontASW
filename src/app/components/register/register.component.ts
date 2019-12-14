import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.services';
import { User } from '../../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {

  public user: User;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) { 
    this.user = new User('', '', '', '');
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.user);
    this._userService.register(this.user).subscribe(
      response => {
        console.log(response);
        window.location.href = '/login';
      }
    );
  }

}

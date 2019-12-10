import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.services';

@Component({
  selector: 'new-issue',
  templateUrl: './new-issue.component.html',
  styleUrls: ['./new-issue.component.css'],
  providers: [UserService]
})
export class NewIssueComponent implements OnInit {

  public user;
  public identity;
  public token;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) { }

  ngOnInit() {
    this.redirectIfIdentity();
  }

  redirectIfIdentity() {
    let identity = this._userService.getIdentity();
    if (identity == null) {
      this._router.navigate(["/login"]);
    }
  }

}

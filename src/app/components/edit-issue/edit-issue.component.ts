import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.services';
import { Issue } from 'src/app/models/issue';
import { UploadedFile } from 'src/app/models/uploadedFile';
import { IssueService } from 'src/app/services/issue.services';

@Component({
  selector: 'app-edit-issue',
  templateUrl: './edit-issue.component.html',
  styleUrls: ['./edit-issue.component.css'],
  providers: [UserService, IssueService]
})
export class EditIssueComponent implements OnInit {

  public id;
  public user;
  public identity;
  public token;
  public issue: Issue;
  public uploadedFile: UploadedFile;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _issueService: IssueService
  ) { 
    this.id = this._route.snapshot.paramMap.get('id');
    this.issue = new Issue(null, null, null, '', '', 'NEW', 'BUG', 'MAJOR', 0, null, null, 0);
    this.uploadedFile = new UploadedFile(null, null, '', null);
  }

  ngOnInit() {
    this.redirectIfIdentity();
    this.token = this._userService.getToken();
    this.getIssue();
  }

  redirectIfIdentity() {
    let identity = this._userService.getIdentity();
    if (identity == null) {
      this._router.navigate(["/login"]);
    }
  }

  onSubmit() {
    this.issue.creationDate = new Date();
    console.log(this.issue);
    this._issueService.create(this.issue, this.token).subscribe(
      response => {
        console.log(response);
        this._router.navigate(["/issue/"+response.id]);
      }
    );
  }

  getIssue() {
    this._issueService.getIssue(this.id).subscribe(
      response => {
        this.issue = (response);
        this.user = response.userCreator;
        this.issue.userAssigneeId = response.userAssignee;
        console.log(this.issue);
      },
      error => {
        console.log(error);
      }
    );
  }

}

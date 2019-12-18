import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.services';
import { Issue } from 'src/app/models/issue';
import { Comment } from 'src/app/models/comment';
import { UploadedFile } from 'src/app/models/uploadedFile';
import { IssueService } from 'src/app/services/issue.services';
import { User } from 'src/app/models/user';
import { UserAssignee } from 'src/app/models/userAssignee';

@Component({
  selector: 'app-edit-issue',
  templateUrl: './edit-issue.component.html',
  styleUrls: ['./edit-issue.component.css'],
  providers: [UserService, IssueService]
})
export class EditIssueComponent implements OnInit {

  public id;
  public user;
  public userAssignee;
  public identity;
  public comment;
  public token;
  public users;
  public idAssignee;
  public issue: Issue;
  public uploadedFile: UploadedFile;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _issueService: IssueService
  ) { 
    this.id = this._route.snapshot.paramMap.get('id');
    this.token = this._userService.getToken();
    this.issue = new Issue(null, null, null, '', '', 'NEW', 'BUG', 'MAJOR', 0, null, null, 0);
    this.comment = new Comment(null, null, null, '');
    this.uploadedFile = new UploadedFile(null, null, '', null);
    this.identity = this._userService.getIdentity();
    this.users = [];
    this.userAssignee = null; 
  }

  ngOnInit() {
    this.redirectIfIdentity();
    this.token = this._userService.getToken();
    this.getIssue();
  }

  redirectIfIdentity() {
    if (this.identity == null) {
      this._router.navigate(["/login"]);
    }
  }

  onSubmit() {
    console.log(this.issue);
    
    var newIssue;
    newIssue.title = this.issue.title;
    newIssue.description = this.issue.description;
    newIssue.type = this.issue.type;
    newIssue.priority = this.issue.priority;
    if (this.userAssignee != null || this.userAssignee != '')
      newIssue.userAssigneeId = this.userAssignee;
    console.log(newIssue);
    
    
    this._issueService.edit(this.id, newIssue, this.token).subscribe(
      response => {
        console.log(response);
        this._router.navigate(["/issue/"+this.id]);
      }
    );
    
  }

  onChange() {
    console.log(this.userAssignee);
  }

  getIssue() {
    this._issueService.getIssue(this.id).subscribe(
      response => {
        this.issue = (response);
        this.user = response.userCreator;
        this.issue.userAssigneeId = response.userAssignee;
        console.log(this.issue);
        this.getUsers();
      },
      error => {
        console.log(error);
      }
    );
  }

  getUsers() {
    this._userService.getUsers(this.token).subscribe(
      response => {
        console.log(response);
        this.users = response;
      },
      error => {
        console.log(error);
      }
    );
  }

}

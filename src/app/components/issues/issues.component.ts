import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { IssueService } from '../../services/issue.services';
import { Issue } from '../../models/issue';
import { Comment } from '../../models/comment';
import { UploadedFile } from '../../models/uploadedFile';
import { User } from '../../models/user';
import { UserService } from 'src/app/services/user.services';

@Component({
  selector: 'issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css'],
  providers: [UserService, IssueService]
})
export class IssuesComponent implements OnInit {

  public user: User;
  public issues;
  public pagina;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _issueService: IssueService,
    private _userService: UserService
  ) { 
    this.getIssues(null, null, null, null);
    this.issues = [];
    this.pagina = 0;
  }

  ngOnInit() {
  }

  getIssues(filter,order, sort, value) {
    this._issueService.getIssues(filter,order, sort, value).subscribe(
      response => {
        this.issues = (response);
        console.log(this.issues);
        if (this.issues.length > 0) this.pagina = 1;
      }
    );
  }

  onClickAll() {
    this.getIssues(null, null, null, null);
  }

  onClickOpen() {
    this.getIssues(null, null, null, null);
  }

  onClickMyIssues() {
    this.getIssues(null, null, null, null);
  }

  onClickWatching(){
    this.getIssues(null, null, null, null);
  }
  
  /////////////////////////////////////////////

  onClickTitle() {
    this.getIssues(null, null, null, null);
  }

  onClickType() {
    this.getIssues(null, null, null, null);
  }

  onClickPriority() {
    this.getIssues(null, null, null, null);
  }

  onClickStatus() {
    this.getIssues(null, null, null, null);
  }

  onClickVotes() {
    this.getIssues(null, null, null, null);
  }

  onClickAssignee() {
    this.getIssues(null, null, null, null);
  }

  onClickCreated() {
    this.getIssues(null, null, null, null);
  }

  onClickUpdated() {
    this.getIssues(null, null, null, null);
  }

  onClickWatch() {
    this.getIssues(null, null, null, null);
  }

  /////////////////////////////////////////////

  onClickFilterByType() {
    this.getIssues(null, null, null, null);
  }

  onClickFilterByPriority() {
    this.getIssues(null, null, null, null);
  }

  onClickFilterByStatus() {
    this.getIssues(null, null, null, null);
  }

  onClickFilterByAssignee() {
    this.getIssues(null, null, null, null);
  }

}

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
    this.getIssues();
    this.issues = [];
    this.pagina = 0;
  }

  ngOnInit() {
  }

  getIssues() {
    this._issueService.getIssues().subscribe(
      response => {
        this.issues = (response);
        console.log(this.issues);
        if (this.issues.length > 0) this.pagina = 1;
      }
    );
  }

  onClickAll() {
    this.getIssues();
  }

  onClickOpen() {
    this.getIssues();
  }

  onClickMyIssues() {
    this.getIssues();
  }

  onClickWatching(){
    this.getIssues();
  }
  
  /////////////////////////////////////////////

  onClickTitle() {
    this.getIssues();
  }

  onClickType() {
    this.getIssues();
  }

  onClickPriority() {
    this.getIssues();
  }

  onClickStatus() {
    this.getIssues();
  }

  onClickVotes() {
    this.getIssues();
  }

  onClickAssignee() {
    this.getIssues();
  }

  onClickCreated() {
    this.getIssues();
  }

  onClickUpdated() {
    this.getIssues();
  }

  onClickWatch() {
    this.getIssues();
  }

  /////////////////////////////////////////////

  onClickFilterByType() {
    this.getIssues();
  }

  onClickFilterByPriority() {
    this.getIssues();
  }

  onClickFilterByAssignee() {
    this.getIssues();
  }

}

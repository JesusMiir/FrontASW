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

  public order;
  public orderby;
  public filter;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _issueService: IssueService,
    private _userService: UserService
  ) { 
    this.getIssues(null, null, null, null);
    this.issues = [];
    this.pagina = 0;

    this.order = "desc";
    this.orderby = "id";
    this.filter = null;
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

  swap_order(column){
    if (this.orderby == column){
      if (this.order == "asc") {
        this.order = "desc";
      } else {
        this.order = "asc";
      }
    }

    this.orderby = column;
  }

  onClickAll() {
    this.getIssues("all", this.order, null, null);
  }

  onClickOpen() {
    this.getIssues("open", this.order, null, null);
  }

  onClickMyIssues() {
    this.getIssues("mine", this.order, null, null);
  }

  onClickWatching(){
    this.getIssues("watching", this.order, null, null);
  }
  
  /////////////////////////////////////////////

  onClickTitle() {
    this.swap_order("title");
    this.getIssues(null, this.order, "title", null);
  }

  onClickType() {
    this.swap_order("type");
    this.getIssues(null, this.order, "type", null);
  }

  onClickPriority() {
    this.swap_order("priority");
    this.getIssues(null, this.order, "prior", null);
  }

  onClickStatus() {
    this.swap_order("status");
    this.getIssues(null, this.order, "status", null);
  }

  onClickVotes() {
    this.swap_order("votes");
    this.getIssues(null, this.order, "votes", null);
  }

  onClickAssignee() {
    this.swap_order("assignee");
    this.getIssues(null, this.order, "assign", null);
  }

  onClickCreated() {
    this.swap_order("create");
    this.getIssues(null, this.order, "create", null);
  }

  onClickUpdated() {
    this.swap_order("update");
    this.getIssues(null, this.order, "update", null);
  }

  onClickWatch() {
    this.swap_order("watch");
    this.getIssues(null, this.order, "watch", null);
  }

  /////////////////////////////////////////////

  onClickFilterByType(value) {
    this.getIssues("type", this.order, null, value);
  }

  onClickFilterByPriority(value) {
    this.getIssues("priority", this.order, null, value);
  }

  onClickFilterByStatus(value) {
    this.getIssues("status", this.order, null, value);
  }

  onClickFilterByAssignee(value) {
    this.getIssues("assign", this.order, null, value);
  }
}

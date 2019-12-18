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
  public identity;

  public order;
  public orderby;
  public filter;
  public filterby;

  public type_icon_src;
  public priority_icon_src;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _issueService: IssueService,
    private _userService: UserService
  ) { 
    this.identity = this._userService.getIdentity();
    this.getIssues(null, null, null, null);
    this.issues = [];
    this.pagina = 0;

    this.order = "desc";
    this.orderby = null;
    this.filter = null;
    this.filterby = null;
  }

  ngOnInit() {
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

  store_filter(filter, value){
    this.filter = filter;
    this.filterby = value;
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
    this.getIssues("all", this.order, this.orderby, null);
    this.filter = null;
  }

  onClickOpen() {
    this.getIssues("open", this.order, this.orderby, null);
    this.filter = "open";
  }

  onClickMyIssues() {
    this.getIssues("mine", this.order, this.orderby, null);
    this.filter = "mine";
  }

  onClickWatching(){
    this.getIssues("watching", this.order, this.orderby, null);
    this.filter = "watching";
  }
  
  /////////////////////////////////////////////

  onClickTitle() {
    this.swap_order("title");
    this.getIssues(this.filter, this.order, this.orderby, this.filterby);
  }

  onClickType() {
    this.swap_order("type");
    this.getIssues(this.filter, this.order, this.orderby, this.filterby);
  }

  onClickPriority() {
    this.swap_order("priority");
    this.getIssues(this.filter, this.order, this.orderby, this.filterby);
  }

  onClickStatus() {
    this.swap_order("status");
    this.getIssues(this.filter, this.order, this.orderby, this.filterby);
  }

  onClickVotes() {
    this.swap_order("votes");
    this.getIssues(this.filter, this.order, this.orderby, this.filterby);
  }

  onClickAssignee() {
    this.swap_order("assignee");
    this.getIssues(this.filter, this.order, this.orderby, this.filterby);
  }

  onClickCreated() {
    this.swap_order("create");
    this.getIssues(this.filter, this.order, this.orderby, this.filterby);
  }

  onClickUpdated() {
    this.swap_order("update");
    this.getIssues(this.filter, this.order, this.orderby, this.filterby);
  }

  onClickWatch() {
    this.swap_order("watch");
    this.getIssues(this.filter, this.order, this.orderby, this.filterby);
  }

  /////////////////////////////////////////////

  onClickFilterByType(value) {
    this.store_filter("type", value);
    this.getIssues(this.filter, this.order, this.orderby, this.filterby);
  }

  onClickFilterByPriority(value) {
    this.store_filter("priority", value);
    this.getIssues(this.filter, this.order, this.orderby, this.filterby);
  }

  onClickFilterByStatus(value) {
    this.store_filter("status", value);
    this.getIssues(this.filter, this.order, this.orderby, this.filterby);
  }

  onClickFilterByAssignee(value) {
    this.store_filter("assign", value);
    this.getIssues(this.filter, this.order, this.orderby, this.filterby);
  }
}

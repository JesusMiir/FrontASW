import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { IssueService } from '../../services/issue.services';
import { CommentService} from '../../services/comment.services';
import { Issue } from '../../models/issue';
import { Comment } from '../../models/comment';
import { UploadedFile } from '../../models/uploadedFile';
import { User } from '../../models/user';
import { UserService } from 'src/app/services/user.services';

@Component({
  selector: 'issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css'],
  providers: [IssueService, CommentService, UserService]
})
export class IssueComponent implements OnInit {

  public id;
  public identity;
  public token;
  public cargado;
  public issue: Issue;
  public user: User;
  public comment: Comment;
  public uploadedFile: UploadedFile;
  public comments;
  public vote;
  public watcher;
  public votes;
  public watchers;
  public status;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _issueService: IssueService,
    private _commentService: CommentService,
    private _userService: UserService
  ) {
    this.id = this._route.snapshot.paramMap.get('id');
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.cargado = false;
    this.getIssue();
    this.getComments();
    this.issue = new Issue(null, null, null, '', '', '', '', '', null, null, null, null);
    this.user = new User('', '', '', '');
    this.comment = new Comment(null, null, null, '');
    this.uploadedFile = new UploadedFile(1, 1, 'File of my holidays', null);
    this.comments = [];
    this.vote = false;
    this.watcher = false;
    this.votes;
    this.watchers;
  }

  ngOnInit() {
  }

  getIssue() {
    this._issueService.getIssue(this.id).subscribe(
      response => {
        this.issue = (response);
        this.status = this.issue.status;
        this.votes = response.votesUsers;
        this.watchers = response.watchers;
        this.user = response.userCreator;
        this.issue.userAssigneeId = response.userAssigneeId;
        console.log(this.issue);
        this.cargado = true;
        this.inVote();
        this.inWatch();
      },
      error => {
        console.log(error);
      }
    );
  }

  getComments() {
    this._commentService.getComments(this.id).subscribe(
      response => {
        this.comments = (response);
        console.log(this.comments);
      }
    );
  }

  submitComment() {
    this._commentService.create(this.id, this.comment, this.token).subscribe(
      response => {
        console.log(response);
        this.comment = new Comment(null, null, null, '');
        this.getComments();
      }
    );
  }

  edit(idComment, change) {
    let i = 0;
    for (let comment of this.comments) {
      if (comment.id == idComment) {
        this.comments[i].edit = change;
        console.log(this.comments);
      } 
      ++i;
    }
  }

  editSubmit(comment) {
    this._commentService.edit(this.id, comment, this.token).subscribe(
      response => {
        console.log(response);
        this.getComments();
      }
    );
  }

  editIssue() {
    this._issueService.editStatus(this.id, this.issue.status, this.token).subscribe(
      response => {
        console.log(response);
        this.getIssue();
      },
      error => {
        console.log(error);
      }
    );
  }


  delete(idComment) {
    this._commentService.delete(this.id, idComment, this.token).subscribe(
      response => {
        console.log(response);
        this.getComments();
      },
      error => {
        console.log(error);
      }
    );
  }

  changeVote() {
    if (!this.vote) {
      this._issueService.createVote(this.id, this.token).subscribe(
        response => {
          console.log(response);
          this.getIssue();
        },
        error => {
          console.log(error);
        }
      );
    }
    else {
      this._issueService.deleteVote(this.id, this.token).subscribe(
        response => {
          console.log(response);
          this.getIssue();
        },
        error => {
          console.log(error);
        }
      );
    }
    
  }

  changeWatch() {
    if (!this.watcher) {
      this._issueService.createWatch(this.id, this.token).subscribe(
        response => {
          console.log(response);
          this.getIssue();
        },
        error => {
          console.log(error);
        }
      );
    }
    else {
      this._issueService.deleteWatch(this.id, this.token).subscribe(
        response => {
          console.log(response);
          this.getIssue();
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  inVote() {
    this.vote = false;
    for(let vote of this.votes){
      if(vote.username == this.identity)
        this.vote = true;
    }
  }

  inWatch() {
    this.watcher = false;
    for(let watcher of this.watchers){
      if(watcher.username == this.identity)
        this.watcher = true;
    }
  }

  changeValueOpen() {
    var text
    if (this.status == 'RESOLVED') {
      text = prompt("Open issue \n\nComment:\n", "");
      if (text != null) this.status = 'OPEN';
    }
    else {
      text = prompt("Resolve issue \n\nComment:\n", "");
      if(text != null) this.status = 'RESOLVED';
    }
    console.log(text);
    if(text != null) {
      if (text != '') text = 'changed status [' + this.status + '] "Comment autor: ' + text + '"';
      else text = 'changed status [' + this.status + ']';
      this.issue.status = this.status;
      this.editIssue();
      this.submitComment();
    }
  }

  changeValueStatus() {
    var text = prompt(this.status, "");
    if(text != null) {
      if (text != '') text = 'changed status [' + this.status + '] "Comment autor: ' + text + '"';
      else text = 'changed status [' + this.status + ']';
      this.comment = new Comment(null, null, null, text);
      this.issue.status = this.status;
      this.editIssue();
      this.submitComment();
    }
  }

}

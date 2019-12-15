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
  public token;
  public issue: Issue;
  public user: User;
  public comment: Comment;
  public uploadedFile: UploadedFile;
  public comments;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _issueService: IssueService,
    private _commentService: CommentService,
    private _userService: UserService
  ) {
    this.id = this._route.snapshot.paramMap.get('id'); 
    this.getIssue();
    this.getComments();
    this.token = this._userService.getToken();
    this.issue = new Issue(null, null, null, '', '', '', '', '', null, null, null, null);
    this.user = new User('', '', '', '');
    this.comment = new Comment(null, null, null, '');
    this.uploadedFile = new UploadedFile(1, 1, 'File of my holidays', null);
    this.comments = [];
  }

  ngOnInit() {
  }

  getIssue() {
    this._issueService.getIssue(this.id).subscribe(
      response => {
        this.issue = (response);
        this.user = response.userCreator;
        console.log(this.issue);
      },
      error => {
        this._router.navigate(["/error"]);
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
        this.getComments();
      }
    );
  }

  edit() {

  }

  delete(idComment) {
    this._commentService.delete(this.id, idComment, this.token).subscribe(
      response => {
        console.log(response);
        this.getComments();
      }
    );
  }

}

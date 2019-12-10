import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { IssueService } from '../../services/issue.services';
import { Issue } from '../../models/issue';
import { Comment } from '../../models/comment';
import { UploadedFile } from '../../models/uploadedFile';
import { User } from '../../models/user';

@Component({
  selector: 'issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css'],
  providers: [IssueService]
})
export class IssueComponent implements OnInit {

  public issue: Issue;
  public user: User;
  public uploadedFile: UploadedFile;
  public comments;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _issueService: IssueService
  ) {
    this.issue = new Issue(3, null, null, 'Third Issue', 'Please, address it as soon as possible', '', '', '', null, null, null);
    this.user = new User('Carles Ferré', 'Carles Ferré', '', '');
    this.uploadedFile = new UploadedFile(1, 1, 'File of my holidays', null);
    this.comments = [
      {id:1, idUser:1, idIssue:1, description:'Hola Mundo! 1', nameUser: 'Joan Mias', data:'2019-04-03'},
      {id:1, idUser:1, idIssue:1, description:'Hola Mundo! 2', nameUser: 'Joan Mias', data:'2019-04-03'},
      {id:1, idUser:1, idIssue:1, description:'Hola Mundo! 3', nameUser: 'Joan Mias', data:'2019-04-03'}
     
    ];
  }

  ngOnInit() {
  }

}

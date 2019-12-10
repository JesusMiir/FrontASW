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

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _issueService: IssueService,
    private _userService: UserService
  ) { 
    this.issues = [
      {id:1, idUser:1, idUserAssignee:1, title:'Issue 1', description:'La mejor issue 1', status:'NEW', type:'Bug', priority:'Important', votes:'10', creationDate:'11-12-19', updateDate:'22-12-19', watched:10},
      {id:1, idUser:1, idUserAssignee:1, title:'Issue 2', description:'La mejor issue 2', status:'NEW', type:'Bug', priority:'Important', votes:'10', creationDate:'11-12-19', updateDate:'22-12-19', watched:11},
      {id:1, idUser:1, idUserAssignee:1, title:'Issue 3', description:'La mejor issue 3', status:'NEW', type:'Bug', priority:'Important', votes:'10', creationDate:'11-12-19', updateDate:'22-12-19', watched:12}
     
    ];
  }

  ngOnInit() {
  }

}

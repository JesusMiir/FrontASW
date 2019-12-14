import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  public user;
  public identity;
  public token;
  public auth2;

  @ViewChild('loginRef', {static: true }) loginElement: ElementRef;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
    this.user = {
      "email" : "",
      "password" : "",
      "getHash" : "true"
    };
  }

  ngOnInit() {
    this.logout();
    this.redirectIfIdentity();
    this.googleSDK();
  }

  logout() {
    this._route.params.forEach((params: Params) => {
      let logout = +params['id'];
      if (logout == 1){
        localStorage.removeItem('identity');
        localStorage.removeItem('token');

        this.identity = null;
        this.token = null;

        window.location.href = '/login';
      }
    });
  }

  redirectIfIdentity() {
    let identity = this._userService.getIdentity();
    if (identity != null && identity.sub) {
      this._router.navigate(["/"]);
    }
  }

  onSubmit() {
    console.log(this.user);
    this._userService.signup(this.user).subscribe(
      response => {
        this.identity = response;
        console.log(response);
        if(this.identity.length <= 1){
          console.log('Error en el servidor');
        }
        else{
          localStorage.setItem('token', JSON.stringify(this.identity.token));
          localStorage.setItem('identity', JSON.stringify(this.identity.username));
          window.location.href = "/";
        }        
      },
      error => {
        console.log(<any> error);
      }
    );
  }

  prepareLoginButton() {
 
    this.auth2.attachClickHandler(this.loginElement.nativeElement, {},
      (googleUser) => {
 
        let profile = googleUser.getBasicProfile();
        console.log('Token || ' + googleUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        //YOUR CODE HERE
 
 
      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
 
  }
  googleSDK() {
 
    window['googleSDKLoaded'] = () => {
      window['gapi'].load('auth2', () => {
        this.auth2 = window['gapi'].auth2.init({
          client_id: '873627019235-cskh41r3gbkrq4s6klrqfmkvidd23gc0.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          scope: 'profile email'
        });
        this.prepareLoginButton();
      });
    }
 
    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'google-jssdk'));
 
  }

}

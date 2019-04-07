import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    if(this.router.url == '/login') {
      if(this.authService.isLoggedIn()) {
        this.router.navigateByUrl('/');
      }
    } else if(this.router.url == '/logout') {
      if(this.authService.isLoggedIn()) {
        this.authService.logOut();
      }
      this.router.navigateByUrl('/');
    }
  }

  loginUser() {
    this.authService.logIn(this.email, this.password);
  }

}

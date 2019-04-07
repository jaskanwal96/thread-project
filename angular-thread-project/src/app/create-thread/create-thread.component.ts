import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ApiConstants } from '../Apiconstant';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-thread',
  templateUrl: './create-thread.component.html',
  styleUrls: ['./create-thread.component.css']
})
export class CreateThreadComponent implements OnInit {

  title: string;
  description: string;
  tags: string[];

  constructor(private http: HttpClient, private authService: AuthService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    if(!this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/login');
    }
  }

  createThread() {
    let postData = {
      title: this.title,
      description: this.description,
      tags: (this.tags ? this.tags.map(
        thread => {
          return thread['value'];
        }
      ) : [])
    }
    console.log(postData);
    this.http.post(
        ApiConstants.threadAddRoute,  JSON.stringify(postData), {}
    ).subscribe( 
        (response) => {
            this.toastr.success("Thread Forked!");
            this.router.navigate(['/']);
        }, 
        (error) => {
            this.toastr.error(error['error']['message']);
        }
    );
  }

}

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiConstants } from '../Apiconstant';
import { HttpClient } from '@angular/common/http';
import { Thread } from './thread';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-thread-list',
  templateUrl: './thread-list.component.html',
  styleUrls: ['./thread-list.component.css']
})
export class ThreadListComponent implements OnInit {

  threads: Thread[];

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    if(!this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/login');
    }
    this.getAllThreads().subscribe(response => {
      if(response.hasOwnProperty('data') &&  Array.isArray(response['data'])) {
        this.threads = response['data'] 
      }
    }, error => {
      console.log(error);
    });
  }

  getAllThreads(): Observable<Thread[]> {
    return this.http.get<Thread[]>(ApiConstants.threadListRoute);
  }

}

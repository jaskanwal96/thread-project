import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Dcoder Tech';
  isLoggedIn = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    console.log(this.authService.isLoggedIn);
    this.isLoggedIn = this.authService.isLoggedIn();
  }

}

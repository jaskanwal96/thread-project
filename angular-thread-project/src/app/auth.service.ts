import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiConstants } from './Apiconstant';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    constructor(private http: HttpClient, private router: Router,private toastr: ToastrService) {
    }

    public isLoggedIn() {
        return localStorage.getItem('auth_token') ? true : false;;
    }

    public logIn(email, password, isLogin = true): void {
        let postData = {
            user_email: email,
            user_password: password
        }
        this.http.post(
            isLogin ? ApiConstants.loginRoute: ApiConstants.registerRoute,  JSON.stringify(postData), {}
        ).subscribe( 
            (response) => {
                this.addToken(response['data']['access_token']);  
                this.toastr.success("Login Successful!")
                this.router.navigate(['/']);
            }, 
            (error) => {
                this.removeToken();
                this.toastr.error(error['error']['message'])
                this.router.navigate(['/']);
            }
        );
    }

    public logOut(): void {
        // this.http.post(
        //     ApiConstants.logoutRoute, {}
        // ).subscribe( 
        //     () => {
        //         this.removeToken();
        //         this.router.navigate(['/']);
        //     }, 
        //     () => {
        //         this.removeToken();
        //         this.router.navigate(['/']);
        //     }
        // );
        this.removeToken();
    }

    public getAuthorizationToken() {
        return localStorage.getItem('auth_token');
    }

    public addToken(authToken) {
        localStorage.setItem('auth_token', authToken);
    }

    public removeToken() {
        localStorage.removeItem('auth_token');
    }
}
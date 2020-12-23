import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, mapTo, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginInfo, Tokens } from './models/auth-types';


const LOGIN_PATH = '/auth/login';
const JWT_TOKEN = 'JWT_TOKEN';


@Injectable({ providedIn: 'root' })
export class AuthService
{
    apiUrl = environment.apiUrl;
    user = new BehaviorSubject<string>(null);
    userName$ = this.user.asObservable();

    constructor(private http:HttpClient){}

    login(loginInfo: LoginInfo): Observable<boolean>{
        let headers = new HttpHeaders({'Content-Type': 'application/json'});
        console.log(this.apiUrl + LOGIN_PATH)
        return this.http.post<any>(this.apiUrl + LOGIN_PATH, loginInfo, {headers:headers})
            .pipe(
                tap(tokens => {
                    if (tokens){
                        this.doLoginUser(loginInfo, tokens),
                        mapTo(true)    
                    }
                    return of(false)
                })
            )
    }

    logout()
    {
        this.user.next(null);
        localStorage.removeItem(JWT_TOKEN);
        localStorage.removeItem("username");
        

    }

    isLoggedIn() {
        return !!this.getJwtToken();
    }

    getJwtToken() {
        return localStorage.getItem(JWT_TOKEN);
    }

    setCurrentUser(username: string){
        this.user.next(username);
    }
    //#region  Login helpers
    private doLoginUser(user: LoginInfo, tokens: Tokens) {
        if (user && user.username){
            this.setCurrentUser(user.username);
            this.storeTokens(tokens);
            this.storeUser(user.username);
        }
    }



    private storeTokens(tokens:Tokens){
        localStorage.setItem(JWT_TOKEN, tokens.jwt);
    }

    private storeUser(username:string){
        localStorage.setItem('username', username);
    }

    //#endregion
}
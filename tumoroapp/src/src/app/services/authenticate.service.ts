import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map , catchError} from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  authToken:any;
  user:any;

  constructor(private httpClient: HttpClient) { 

  }
  registerUser(user) {
    let httpHeaders = new HttpHeaders();
    httpHeaders.append('Content-Type', 'application/json');
    return this.httpClient.post('http://localhost:3000/users/register', user, {headers:httpHeaders}).pipe(map(response => response));
  }

  // getProfile() {
  //   let httpHeaders = new HttpHeaders();
  //   httpHeaders.append('Content-Type', 'application/json');
  //   return this.httpClient.get('http://localhost:3000/users/profile', {headers:httpHeaders}).pipe(map(response => response));
  // }

  getProfile() {
    let httpHeaders = new HttpHeaders();
    httpHeaders.append('Content-Type', 'application/json');
    return this.httpClient.get('http://localhost:3000/users/profile', {headers:httpHeaders}).pipe(
      catchError(error => {
        // Handle any errors that occur during the request
        console.error(error);
        return throwError(error);
      })
    );
  }
  

  authenticateUser(user) {
    let httpHeaders = new HttpHeaders();
    this.loadToken();
    httpHeaders.append('Authorization', 'this.authToken');
    httpHeaders.append('Content-Type', 'application/json');
    return this.httpClient.post('http://localhost:3000/users/authenticate', user, {headers:httpHeaders}).pipe(map(response => response));
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}

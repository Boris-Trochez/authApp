import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { catchError, map, tap } from "rxjs/operators";
import { of, Observable } from 'rxjs';




import { AuthResponse, User } from '../interfaces/interface';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = environment.baseUrl;
  private _user: User;

  get user() {
    
    return { ...this._user } ;
  }

  constructor( private http: HttpClient ) { }

  register( name: string, email: string, password: string ) {
    const url = `${ this.baseUrl }/auth/new`;
    const body = {name, email, password};

    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap( ({ ok, token }) => {
          
          if( ok ) {
            localStorage.setItem('token', token);
          }
        }),
        map( res => res.ok),
        catchError(err => of(err.error.msg)
        )
      )

  }

  login( email: string, password: string ) {
    const url = `${ this.baseUrl }/auth`;
    const body = { email, password };
    return this.http.post<AuthResponse>(url, body )
      .pipe(
        tap( ({ ok, token }) => {
          if( ok ) {
            localStorage.setItem( 'token', token );
          }
        } ), //Execute the code before executing the next operators
        map( valid => {
          console.log("Valid", valid);
          valid.ok
         }), //map is an operator to mutate the response
        catchError( err => of(err.error.msg)) //"of" converts a series of values in stream of Observables, where you can subscribe to get the response
      ); //the order of the operators inside the pipe is important, due to they are passing data in cascade.
  }


  validateToken(): Observable<boolean> {
    const url = `${ this.baseUrl }/auth/renew`;
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');

    return this.http.get<AuthResponse>(url, { headers })  //{headers} --> {headers: headers}  
      .pipe(
        map( res => {

          localStorage.setItem( 'token', res.token );
            this._user = {
              name: res.name,
              email: res.email,
              id: res.id
            }

          return res.ok;
        }),
        catchError( err => of(false))
      );
  }

  logout() {
    localStorage.clear();
  }

}

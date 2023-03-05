import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { UrlApli } from '../../../assets/Config/UrlConfig';
import { Users } from 'src/app/Models/User';
import { NgStyle } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private handleError: any;
  private urlApi = UrlApli;
  constructor(
    private http: HttpClient
  ) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  _getUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(`${this.urlApi}User/user`)
      .pipe(retry(0), catchError(this.handleError), map((response) => {
        return response;
      }));
  }

  _postUser(user: Users): Observable<any> {
    return this.http
      .post<any>(`${this.urlApi}User/user`, JSON.stringify(user), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError), map((response) => {
          return response;
        })
      )
  };
}


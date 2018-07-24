import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Registration} from '../models/index';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

@Injectable({
    providedIn: 'root'
})
export class CommonService {

    constructor(private http: HttpClient) {
    }

    url = 'http://localhost:3000';

    registration(body: Registration): Observable<Registration | any> {
        return this
            .http
            .post<Registration>(`${this.url}/`, body, httpOptions).pipe(
                catchError(err => of(err))
            );
    }
}
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';

import { Observable } from 'rxjs';

@Injectable()
export class DataService {

  private requestOptions: RequestOptions = new RequestOptions({
    headers: new Headers({
      'Authorization': 'token 09123582-43ba-4816-9063-cc6c420540b9'
    })
  });

  constructor(private http: Http) { }

  getTodos () {
    return this.http.get('./me/todomvc', this.requestOptions).map(res => {
      return res.json();
    }).catch(err => {
      return Observable.of([]);
    });
  }

  updateTodos (newTodos: any[]) {
    return this.http.post('./me/todomvc', newTodos, this.requestOptions).map(res => {
      return res.json();
    }).catch(error => {
      return this.handleError(error);
    });
  }

  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}

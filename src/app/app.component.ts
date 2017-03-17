import { Component } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  inputHint  = 'What needs to be done?';
  todos: any[] = [];
  todo = '';
  filterType = 'All';
  toggleAll = false;
  requestOptions: RequestOptions = new RequestOptions({
    headers: new Headers({
      'Authorization': 'token 09123582-43ba-4816-9063-cc6c420540b9'
    })
  });

  constructor (private http: Http) {
    this.http.get('./me/todomvc', this.requestOptions).subscribe(res => {
      this.todos = res.json();
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

  updateTodos (newTodos: any[]): Observable<any[]> {
    let oldTodos = [...this.todos];
    this.todos = newTodos;
    return this.http.post('./me/todomvc', newTodos, this.requestOptions).map(res => {
      return res.json();
    }).catch(error => {
      this.todos = oldTodos;
      return this.handleError(error);
    });
  }

  updateTodo (todo: any, done: boolean) {
    let newTodos = [...this.todos];
    this.updateTodos(newTodos).subscribe(data => {}, err => {
      todo.done = !done;
    });
  }

  addTodo () {
    if (this.todo) {
      let newTodos = [...this.todos];
      newTodos.push({
        text: this.todo,
        done: false
      });
      let oldTodo = this.todo;
      this.todo = '';
      this.updateTodos(newTodos).subscribe(data => {}, error => {
        this.todo = oldTodo;
      });
    }
  }

  clearCompleted () {
    let newTodos = this.todos.filter(item => { return !item.done; });
    this.updateTodos(newTodos).subscribe(data => {});
  }

  filterTodos (type: string) {
    this.filterType = type;
  }

  toggleAllOnChange () {
    this.todos.forEach(item => {
      item.done = this.toggleAll;
    });
  }

  removeTodo (todo: any) {
    let newTodos = [...this.todos];
    newTodos.splice(newTodos.indexOf(todo), 1);
    this.updateTodos(newTodos).subscribe(data => {});
  }
}

import { Component } from '@angular/core';
import { Http } from '@angular/http';

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

  constructor(private http: Http) {
  }

  addTodo() {
    if (this.todo) {
      this.todos = [...this.todos];
      this.todos.push({
        todo: this.todo,
        done: false
      });
      this.todo = '';
    }
  }

  clearCompleted() {
    this.todos = this.todos.filter(item => { return !item.done; });
  }

  filterTodos(type: string) {
    this.filterType = type;
  }

  toggleAllOnChange() {
    this.todos.forEach(item => {
      item.done = this.toggleAll;
    });
  }

  removeTodo(todo: any) {
    this.todos.splice(this.todos.indexOf(todo), 1);
    this.todos = [...this.todos];
  }
}

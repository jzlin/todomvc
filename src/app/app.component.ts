import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  inputHint  = 'What needs to be done?';
  todos: any[] = [];
  todo = '';

  addTodo() {
    if (this.todo) {
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
}

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
  filterType = 'All';

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
}

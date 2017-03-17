import { Component, OnInit } from '@angular/core';
import { DataService } from "./data.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  inputHint  = 'What needs to be done?';
  todos: any[] = [];
  todo = '';
  filterType: string;
  toggleAll = false;

  constructor (private dataSvc: DataService) {
  }

  ngOnInit () {
    this.dataSvc.getTodos().subscribe(data => {
      this.todos = data;
      this.updateToggleAllState();
    })
  }

  private updateTodos (newTodos: any[]) {
    let oldTodos = [...this.todos];
    this.todos = newTodos;
    this.updateToggleAllState();
    return this.dataSvc.updateTodos(newTodos).catch(err => {
      this.todos = oldTodos;
      this.updateToggleAllState();
      return err;
    });
  }

  private updateToggleAllState () {
    this.toggleAll = this.todos.filter(item => { return !item.done; }).length === 0;
  }

  updateTodo () {
    let newTodos = [...this.todos];
    this.updateTodos(newTodos).subscribe(data => {});
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

  filterTypeChange (type: string) {
    this.filterType = type;
  }

  toggleAllChange (value: boolean) {
    let newTodos = [...this.todos];
    newTodos.forEach(item => {
      item.done = value;
    });
    this.updateTodos(newTodos).subscribe(data => {});
  }

  removeTodo (todo: any) {
    let newTodos = [...this.todos];
    newTodos.splice(newTodos.indexOf(todo), 1);
    this.updateTodos(newTodos).subscribe(data => {});
  }
}

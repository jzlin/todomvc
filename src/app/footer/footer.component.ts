import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  private _todos: any[];

  @Input()
  set todos(val: any[]) {
    this._todos = val;
    this.tooMuch = this._todos.filter(item => !item.done).length > 5;
  }
  get todos(): any[] {
    return this._todos;
  }

  @Output()
  clearCompleted = new EventEmitter();

  filterType = 'All';

  @Output()
  filterTypeChange = new EventEmitter<string>();

  tooMuch = false;

  constructor () { }

  ngOnInit () {
  }

  clearBtnClick () {
    this.clearCompleted.emit();
  }

  changeFilterType (type: string) {
    this.filterType = type;
    this.filterTypeChange.emit(type);
  }

  haveComplete () {
    return this.todos.filter(item => { return item.done; }).length > 0;
  }

}

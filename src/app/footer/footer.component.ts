import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  @Input()
  todos: any[];

  @Output()
  clearCompleted = new EventEmitter();

  filterType = 'All';

  @Output()
  filterTodos = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  clearBtnOnClick() {
    this.clearCompleted.emit();
  }

  filterTypeOnClick(type: string) {
    this.filterType = type;
    this.filterTodos.emit(type);
  }

}

import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Filter } from '../../models/filter.enum';
import { TodosService } from '../../services/todos.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  filter = Filter;
  filter$: Observable<Filter>
  noTodoClass$: Observable<boolean>
  activeCount$: Observable<number>
  itemsLeftText$: Observable<string>
  constructor(private todoService: TodosService) { 
    this.activeCount$ = this.todoService.todos$.pipe(map(todos => {
      return todos.filter(todo => !todo.isComplited).length
    }))
    this.itemsLeftText$ = this.activeCount$.pipe(map(activeCount => {
      return `item${activeCount > 1 ? 's' : ''} left`
    }))
    this.noTodoClass$ = this.todoService.todos$.pipe(map(todos => todos.length === 0))
    this.filter$ = this.todoService.filter$
  }

  ngOnInit() {
  }

  changeFilter(event: Event, filter: Filter){
    event.preventDefault();
    this.todoService.changeFilter(filter)
  }
}

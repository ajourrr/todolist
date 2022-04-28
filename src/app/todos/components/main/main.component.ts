import { Component, OnInit } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { Filter } from '../../models/filter.enum';
import { Todos } from '../../models/todos';
import { TodosService } from '../../services/todos.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  
  noTodoClass$: Observable<boolean>
  visibleTodos$: Observable<Todos[]>;
  isAllTodosSelected$:Observable<boolean>
  editingId: string | null = null;
  
  constructor(private todoService: TodosService) {
    this.noTodoClass$ = this.todoService.todos$.pipe(map(todos => todos.length === 0))
    this.isAllTodosSelected$ = this.todoService.todos$.pipe(map(todos => todos.every(todo => todo.isComplited)))
    this.visibleTodos$ = combineLatest(
      [this.todoService.todos$,
      this.todoService.filter$]
    ).pipe(map(([todo, filter]: [Todos[], Filter]) => {
      if(filter === Filter.active){
        const active = todo.filter(todo => !todo.isComplited)
        return active
      } else if(filter === Filter.completed){
        const completed = todo.filter(todo => todo.isComplited === true)
        return completed
      }
      return todo;
    }))
  }

  toggleAllTodos(event: Event): void{
    const target = event.target as HTMLInputElement;
    this.todoService.toggleAll(target.checked)
  }

  ngOnInit() {
  }

  setEditingId(editingId: string | null){
    this.editingId = editingId;
  }
}

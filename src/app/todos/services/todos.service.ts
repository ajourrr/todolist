import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Filter } from '../models/filter.enum';
import { Todos } from '../models/todos';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  
  todos$ = new BehaviorSubject<Todos[]>([])
  filter$ = new BehaviorSubject<Filter>(Filter.all) 

  constructor() { }

  addTodo(text:string){
    const newTodo = {
      name: text,
      id: Math.random().toString(16),
      isComplited: false,
    }
    const updatedTodo = [...this.todos$.getValue(), newTodo]
    this.todos$.next(updatedTodo)
  }
  toggleAll(isComplited: boolean){
    const updatedTodo = this.todos$.getValue().map(todo => {
      return {
        ...todo,
        isComplited
      }
    })
    this.todos$.next(updatedTodo)
    
  }
  changeFilter(filter: Filter): void{
    this.filter$.next(filter)
  }
  changeText(id: string, name:string){
    const updateTodo = this.todos$.getValue().map(todo => {
      if(todo.id === id){
        return {
          ...todo,
          name
        }
      }
      return todo;
    })
    this.todos$.next(updateTodo)
  }
  deleteTodo(id:string){
    const updatedTodo = this.todos$.getValue().filter(todo => todo.id !== id)
    this.todos$.next(updatedTodo)
  }
  toggleTodo(id:string){
    const updateTodo = this.todos$.getValue().map(todo => {
      if(todo.id === id){
        return {
          ...todo,
          isComplited: !todo.isComplited
        }
      }
      return todo;
    })
    this.todos$.next(updateTodo)
  }
}

import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { Todos } from '../../models/todos';
import { TodosService } from '../../services/todos.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit, OnChanges {

  @Input('todo') todoProps!: Todos
  @Input('isEditing') isEditingProps!: boolean
  @Output('setEditingId') editingIdEvent: EventEmitter<string | null> = new EventEmitter()
  @ViewChild('editingFocus') enditingFocus!: ElementRef
  editingText: string = '';

  constructor(private todoService: TodosService) {}

  ngOnInit() {
    this.editingText = this.todoProps.name;
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['isEditingProps'].currentValue) {
      setTimeout(() => {
        this.enditingFocus.nativeElement.focus();
      }, 0);
    }
  }

  setTodoInEditMode(){
    this.editingIdEvent.emit(this.todoProps.id)
  
  }

  deleteTodo(){
    console.log('delete todo')
    this.todoService.deleteTodo(this.todoProps.id)
  }
  changeText(event: Event){
    const value = (event.target as HTMLInputElement).value
    this.editingText = value
  }
  changeTodo(){
    this.todoService.changeText(this.todoProps.id, this.editingText)
    this.editingIdEvent.emit(null)
  }
  toggleTodo(){
    this.todoService.toggleTodo(this.todoProps.id);
  }
 

}

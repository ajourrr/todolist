import { Component, OnInit } from '@angular/core';
import { TodosService } from '../../services/todos.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  text:string = '';
  

  constructor(private todoService: TodosService) {}

  ngOnInit() {
  }

  addTodo(){
    this.todoService.addTodo(this.text);
    this.text = '';
  }

}

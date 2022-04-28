import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodosComponent } from './todos.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainComponent } from './components/main/main.component';
import { FormsModule } from '@angular/forms';
import { TodosService } from './services/todos.service';
import { TodoComponent } from './components/todo/todo.component';

const routes:Routes = [
  {
    path: '',
    component: TodosComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
  declarations: [
  TodosComponent,
  HeaderComponent,
  FooterComponent,
  MainComponent,
  TodoComponent
],
providers: [TodosService]
})
export class TodosModule { }

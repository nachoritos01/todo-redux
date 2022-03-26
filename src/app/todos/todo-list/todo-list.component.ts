import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Todo } from '../models/todo.model';
import { AppState } from '../../app.reducer';
import { filtrosValidos } from 'src/app/filtro/filtro.actions';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  public todos: Todo[] = [];
  public filtroActual!: string ;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    //Reconoce que todos es parte de la interface de AppStore
    //this.store.select('todos').subscribe(todos => this.todos = todos);
    this.store.subscribe(({ todos, filtros }) => {
      this.todos = todos;
      this.filtroActual = filtros;
    });
  }
}

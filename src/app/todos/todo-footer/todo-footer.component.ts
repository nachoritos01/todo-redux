import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { setFiltro } from 'src/app/filtro/filtro.actions';
import { filtrosValidos } from '../../filtro/filtro.actions';
import { limpiarTodos } from '../todo.actions';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.css'],
})
export class TodoFooterComponent implements OnInit {
  public filtroActual: string = 'todos';
  public filtros: filtrosValidos[] = ['todos', 'completados', 'pendientes'];
  pendientes: number = 0;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    //this.store.select('filtros').subscribe( filtro => this.filtroActual =  filtro)
    this.store.subscribe((state) => {
      this.filtroActual = state.filtros;
      this.pendientes = state.todos.filter((todo) => !todo.completado).length;
    });
  }

  cambiarFiltro(filtro: filtrosValidos) {
    this.store.dispatch(setFiltro({ filtro }));
  }

  limpiarTodos() {
    this.store.dispatch(limpiarTodos());
  }
}

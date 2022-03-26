import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Todo } from '../models/todo.model';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as actions from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent implements OnInit {
  @ViewChild('inputFisico') txtInputFisico!: ElementRef;
  @Input()
  todo!: Todo;
  editando = false;

  checkCompletado!: FormControl;
  txtInput!: FormControl;

  constructor(private store :Store<AppState>) {}

  ngOnInit(): void {
    this.checkCompletado = new FormControl(this.todo.completado);
    this.txtInput = new FormControl(this.todo.texto, Validators.required);
  }

  editar() {
    this.editando = true;
    this.txtInput.setValue(this.todo.texto);
    setTimeout(() => {
      this.txtInputFisico.nativeElement.focus();
    }, 1);
  }
  
  terminarEdicion(){
    this.editando = false;
    if(this.txtInput.invalid ) { return}
    if(this.txtInput.value === this.todo.texto ) { return}

    this.store.dispatch(actions.editar({id: this.todo.id, texto: this.txtInput.value}));

  }

  eliminarTodo() {
    this.store.dispatch(actions.eliminar({id: this.todo.id}))
    
  }

  toggle() {
    this.store.dispatch(actions.toggle({id: this.todo.id}))
  }

}

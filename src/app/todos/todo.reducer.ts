import { Action, createReducer, on } from '@ngrx/store';
import { Todo } from './models/todo.model';
import {
  crear,
  toggle,
  editar,
  eliminar,
  toggleAll,
  limpiarTodos,
} from './todo.actions';

export const initialState: Todo[] = [
  new Todo('Vencer a thanos'),
  new Todo('salvar al mundo'),
  new Todo('Robar el escudo del cap'),
];

const _todoReducer = createReducer(
  initialState,
  // Spred separa cada uno de los todos que tenga para extraerlos de manerda independiente
  // Copia cada uno de los Todos[] del estado actual [...state]
  // Siempre regresar un nuevo estado y prevenir la mutacion de ese objeto
  // Si fuera un valor primitivo no tendria problema, ya que pasan por valor
  // Un objeto o arreglo son pasados por referencia, un push lo puede mutar
  on(crear, (state, { texto }) => [...state, new Todo(texto)]),
  on(limpiarTodos, state => state.filter(todo => !todo.completado)),

  on(toggle, (state, { id }) => {
    return state.map((todo) => {
      if (todo.id === id)
        return {
          //extrae todas las propiedades y solo modifica el completado
          ...todo,
          completado: !todo.completado,
        };
      return todo;
    });
  }),

  on(editar, (state, { id, texto }) => {
    return state.map((todo) => {
      if (todo.id === id)
        return {
          //extrae todas las propiedades y solo modifica el completado
          ...todo,
          texto,
        };
      return todo;
    });
  }),

  on(eliminar, (state, { id }) => {
    return state.filter((todo) => todo.id !== id);
  }),

  on(toggleAll, (state, { completado }) =>
    state.map((todo) => {
      return {
        ...todo,
        completado,
      };
    })
  )
);

export function todoReducer(state: Todo[] = initialState, action: Action) {
  return _todoReducer(state, action);
}

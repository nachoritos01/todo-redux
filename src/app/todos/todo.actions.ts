import { createAction, props } from '@ngrx/store';

export const crear = createAction(
  '[TODO] Crear',
  props<{ texto: string }>()
);

export const toggle = createAction(
  '[TODO] Toggle',
  props<{ id: number }>()
);
export const editar = createAction(
  '[TODO] Editar',
  props<{ id: number , texto: string}>()
);
export const eliminar = createAction(
  '[TODO] Eliminar',
  props<{ id: number }>()
);
export const toggleAll = createAction(
  '[TODO] toggleAll',
  props<{ completado: boolean }>()
);
export const limpiarTodos = createAction(
  '[TODO] LimpiarTodos',
);
